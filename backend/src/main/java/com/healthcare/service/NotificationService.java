package com.healthcare.service;

import com.healthcare.entity.Appointment;
import com.healthcare.entity.Notification;
import com.healthcare.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class NotificationService {

  @Autowired
  private NotificationRepository notificationRepository;

  @Autowired(required = false)
  private SimpMessagingTemplate messagingTemplate;

  public void sendAppointmentNotification(Appointment appointment, String type) {
    // Create notification for patient
    Notification patientNotification = createNotification(
        appointment.getPatient(),
        type,
        getPatientNotificationTitle(type),
        getPatientNotificationMessage(appointment, type),
        appointment.getId());

    // Create notification for doctor
    Notification doctorNotification = createNotification(
        appointment.getDoctor().getUser(),
        type,
        getDoctorNotificationTitle(type),
        getDoctorNotificationMessage(appointment, type),
        appointment.getId());

    // Send WebSocket notifications
    if (messagingTemplate != null) {
      sendWebSocketNotification(appointment.getPatient().getId(), patientNotification);
      sendWebSocketNotification(appointment.getDoctor().getUser().getId(), doctorNotification);
    }
  }

  private Notification createNotification(com.healthcare.entity.User user, String type,
      String title, String message, Long referenceId) {
    Notification notification = new Notification();
    notification.setUser(user);
    notification.setType(type);
    notification.setTitle(title);
    notification.setMessage(message);
    notification.setReferenceId(referenceId);
    notification.setIsRead(false);

    return notificationRepository.save(notification);
  }

  private void sendWebSocketNotification(Long userId, Notification notification) {
    Map<String, Object> payload = new HashMap<>();
    payload.put("id", notification.getId());
    payload.put("type", notification.getType());
    payload.put("title", notification.getTitle());
    payload.put("message", notification.getMessage());
    payload.put("createdAt", notification.getCreatedAt());

    messagingTemplate.convertAndSendToUser(
        userId.toString(),
        "/queue/notifications",
        payload);
  }

  private String getPatientNotificationTitle(String type) {
    return switch (type) {
      case "APPROVED" -> "Appointment Confirmed";
      case "REJECTED" -> "Appointment Declined";
      case "CANCELLED" -> "Appointment Cancelled";
      default -> "Appointment Update";
    };
  }

  private String getPatientNotificationMessage(Appointment appointment, String type) {
    String doctorName = appointment.getDoctor().getUser().getFullName();
    String date = appointment.getAppointmentDate().toString();
    String time = appointment.getAppointmentTime().toString();

    return switch (type) {
      case "APPROVED" -> String.format("Your appointment with %s on %s at %s has been confirmed",
          doctorName, date, time);
      case "REJECTED" -> String.format("Your appointment request with %s has been declined", doctorName);
      case "CANCELLED" -> String.format("Your appointment with %s on %s has been cancelled",
          doctorName, date);
      default -> String.format("Your appointment with %s has been updated", doctorName);
    };
  }

  private String getDoctorNotificationTitle(String type) {
    return switch (type) {
      case "NEW_REQUEST" -> "New Appointment Request";
      case "CANCELLED" -> "Appointment Cancelled";
      default -> "Appointment Update";
    };
  }

  private String getDoctorNotificationMessage(Appointment appointment, String type) {
    String patientName = appointment.getPatient().getFullName();
    String date = appointment.getAppointmentDate().toString();
    String time = appointment.getAppointmentTime().toString();

    return switch (type) {
      case "NEW_REQUEST" -> String.format("%s has requested an appointment on %s at %s",
          patientName, date, time);
      case "CANCELLED" -> String.format("%s has cancelled the appointment on %s", patientName, date);
      default -> String.format("Appointment with %s has been updated", patientName);
    };
  }
}
