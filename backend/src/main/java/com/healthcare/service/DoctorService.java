package com.healthcare.service;

import com.healthcare.entity.Appointment;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.Schedule;
import com.healthcare.entity.User;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DoctorService {

  @Autowired
  private DoctorRepository doctorRepository;

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private ScheduleRepository scheduleRepository;

  @Autowired
  private NotificationService notificationService;

  @Autowired
  private EmailService emailService;

  public Doctor getDoctorProfile(Long userId) {
    return doctorRepository.findByUserId(userId)
        .orElseThrow(() -> new RuntimeException("Doctor profile not found"));
  }

  public List<Appointment> getAppointments(Long doctorId) {
    return appointmentRepository.findByDoctorId(doctorId);
  }

  public List<Appointment> getPendingAppointments(Long doctorId) {
    return appointmentRepository.findByDoctorIdAndStatus(doctorId, Appointment.AppointmentStatus.PENDING);
  }

  public List<Appointment> getTodayAppointments(Long doctorId) {
    return appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, LocalDate.now());
  }

  public Appointment approveAppointment(Long appointmentId, Long doctorId) {
    Appointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new RuntimeException("Appointment not found"));

    if (!appointment.getDoctor().getId().equals(doctorId)) {
      throw new RuntimeException("Unauthorized");
    }

    appointment.setStatus(Appointment.AppointmentStatus.APPROVED);
    appointment = appointmentRepository.save(appointment);

    // Send notifications
    notificationService.sendAppointmentNotification(appointment, "APPROVED");
    emailService.sendAppointmentConfirmation(appointment);

    return appointment;
  }

  public Appointment rejectAppointment(Long appointmentId, Long doctorId) {
    Appointment appointment = appointmentRepository.findById(appointmentId)
        .orElseThrow(() -> new RuntimeException("Appointment not found"));

    if (!appointment.getDoctor().getId().equals(doctorId)) {
      throw new RuntimeException("Unauthorized");
    }

    appointment.setStatus(Appointment.AppointmentStatus.REJECTED);
    appointment = appointmentRepository.save(appointment);

    notificationService.sendAppointmentNotification(appointment, "REJECTED");

    return appointment;
  }

  public List<Schedule> getSchedule(Long doctorId) {
    return scheduleRepository.findByDoctorId(doctorId);
  }

  public Schedule addSchedule(Long doctorId, Schedule schedule) {
    Doctor doctor = doctorRepository.findById(doctorId)
        .orElseThrow(() -> new RuntimeException("Doctor not found"));

    schedule.setDoctor(doctor);
    return scheduleRepository.save(schedule);
  }

  public List<User> getPatients(Long doctorId) {
    return appointmentRepository.findByDoctorId(doctorId).stream()
        .map(Appointment::getPatient)
        .distinct()
        .toList();
  }
}
