package com.healthcare.controller;

import com.healthcare.dto.MessageResponse;
import com.healthcare.entity.Appointment;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.Schedule;
import com.healthcare.entity.User;
import com.healthcare.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class DoctorController {

  @Autowired
  private DoctorService doctorService;

  @GetMapping("/profile")
  public ResponseEntity<Doctor> getProfile(@AuthenticationPrincipal User user) {
    return ResponseEntity.ok(doctorService.getDoctorProfile(user.getId()));
  }

  @GetMapping("/appointments")
  public ResponseEntity<List<Appointment>> getAppointments(
      @AuthenticationPrincipal User user,
      @RequestParam(required = false) String filter) {

    Doctor doctor = doctorService.getDoctorProfile(user.getId());

    if ("pending".equals(filter)) {
      return ResponseEntity.ok(doctorService.getPendingAppointments(doctor.getId()));
    } else if ("today".equals(filter)) {
      return ResponseEntity.ok(doctorService.getTodayAppointments(doctor.getId()));
    }

    return ResponseEntity.ok(doctorService.getAppointments(doctor.getId()));
  }

  @PutMapping("/appointments/{id}/approve")
  public ResponseEntity<?> approveAppointment(
      @PathVariable Long id,
      @AuthenticationPrincipal User user) {
    try {
      Doctor doctor = doctorService.getDoctorProfile(user.getId());
      Appointment appointment = doctorService.approveAppointment(id, doctor.getId());
      return ResponseEntity.ok(appointment);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @PutMapping("/appointments/{id}/reject")
  public ResponseEntity<?> rejectAppointment(
      @PathVariable Long id,
      @AuthenticationPrincipal User user) {
    try {
      Doctor doctor = doctorService.getDoctorProfile(user.getId());
      Appointment appointment = doctorService.rejectAppointment(id, doctor.getId());
      return ResponseEntity.ok(appointment);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @GetMapping("/schedule")
  public ResponseEntity<List<Schedule>> getSchedule(@AuthenticationPrincipal User user) {
    Doctor doctor = doctorService.getDoctorProfile(user.getId());
    return ResponseEntity.ok(doctorService.getSchedule(doctor.getId()));
  }

  @PostMapping("/schedule")
  public ResponseEntity<?> addSchedule(
      @AuthenticationPrincipal User user,
      @RequestBody Schedule schedule) {
    try {
      Doctor doctor = doctorService.getDoctorProfile(user.getId());
      Schedule created = doctorService.addSchedule(doctor.getId(), schedule);
      return ResponseEntity.ok(created);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @GetMapping("/patients")
  public ResponseEntity<List<User>> getPatients(@AuthenticationPrincipal User user) {
    Doctor doctor = doctorService.getDoctorProfile(user.getId());
    return ResponseEntity.ok(doctorService.getPatients(doctor.getId()));
  }
}
