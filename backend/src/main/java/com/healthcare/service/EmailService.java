package com.healthcare.service;

import com.healthcare.entity.Appointment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

  @Autowired(required = false)
  private JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String fromEmail;

  public void sendAppointmentConfirmation(Appointment appointment) {
    if (mailSender == null) {
      logger.warn("Email service is not configured. Skipping email notification.");
      return;
    }

    try {
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom(fromEmail);
      message.setTo(appointment.getPatient().getEmail());
      message.setSubject("Appointment Confirmation - Healthcare System");
      message.setText(buildConfirmationEmail(appointment));

      mailSender.send(message);
      logger.info("Confirmation email sent to {}", appointment.getPatient().getEmail());
    } catch (Exception e) {
      logger.error("Failed to send email: {}", e.getMessage());
    }
  }

  private String buildConfirmationEmail(Appointment appointment) {
    return String.format("""
        Dear %s,

        Your appointment has been confirmed!

        Details:
        Doctor: %s
        Specialization: %s
        Date: %s
        Time: %s

        Please arrive 10 minutes early for your appointment.

        If you need to cancel or reschedule, please do so at least 24 hours in advance.

        Best regards,
        Healthcare Appointment System
        """,
        appointment.getPatient().getFullName(),
        appointment.getDoctor().getUser().getFullName(),
        appointment.getDoctor().getSpecialization(),
        appointment.getAppointmentDate(),
        appointment.getAppointmentTime());
  }
}
