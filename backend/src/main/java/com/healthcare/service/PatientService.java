package com.healthcare.service;

import com.healthcare.dto.AppointmentRequest;
import com.healthcare.entity.Appointment;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.User;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PatientService {

  @Autowired
  private DoctorRepository doctorRepository;

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private NotificationService notificationService;

  @Autowired
  private EmailService emailService;

  public List<Doctor> getAllDoctors() {
    return doctorRepository.findAllActiveDoctors();
  }

  public List<Doctor> getDoctorsBySpecialization(String specialization) {
    return doctorRepository.findBySpecialization(specialization);
  }

  public List<String> getAllSpecializations() {
    return doctorRepository.findAllSpecializations();
  }

  public Appointment bookAppointment(User patient, AppointmentRequest request) {
    Doctor doctor = doctorRepository.findById(request.getDoctorId())
        .orElseThrow(() -> new RuntimeException("Doctor not found"));

    // Check if slot is available
    List<Appointment> existingAppointments = appointmentRepository
        .findByDoctorIdAndAppointmentDate(doctor.getId(), request.getAppointmentDate());

    boolean slotTaken = existingAppointments.stream()
        .filter(apt -> apt.getStatus() != Appointment.AppointmentStatus.CANCELLED
            && apt.getStatus() != Appointment.AppointmentStatus.REJECTED)
        .anyMatch(apt -> apt.getAppointmentTime().equals(request.getAppointmentTime()));

    if (slotTaken) {
      throw new RuntimeException("This time slot is already booked");
    }

    Appointment appointment = new Appointment();
    appointment.setPatient(patient);
    appointment.setDoctor(doctor);
    appointment.setAppointmentDate(request.getAppointmentDate());
    appointment.setAppointmentTime(request.getAppointmentTime());
    appointment.setReason(request.getReason());
    appointment.setStatus(Appointment.AppointmentStatus.PENDING);

    appointment = appointmentRepository.save(appointment);

    // Send notifications
    notificationService.sendAppointmentNotification(appointment, "NEW_REQUEST");

    return appointment;
  }

  public List<Appointment> getMyAppointments(Long patientId) {
    return appointmentRepository.findByPatientId(patientId);
  }

  public void cancelAppointment(Long appointmentId, Long patientId) {
    Appointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new RuntimeException("Appointment not found"));

    if (!appointment.getPatient().getId().equals(patientId)) {
      throw new RuntimeException("Unauthorized");
    }

    if (appointment.getStatus() == Appointment.AppointmentStatus.COMPLETED) {
      throw new RuntimeException("Cannot cancel completed appointment");
    }

    appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
    appointmentRepository.save(appointment);

    notificationService.sendAppointmentNotification(appointment, "CANCELLED");
  }
}
