package com.healthcare.controller;

import com.healthcare.dto.AppointmentRequest;
import com.healthcare.dto.MessageResponse;
import com.healthcare.entity.Appointment;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.User;
import com.healthcare.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {

  @Autowired
  private PatientService patientService;

  @GetMapping("/doctors")
  public ResponseEntity<List<Doctor>> getAllDoctors(
      @RequestParam(required = false) String specialization) {
    if (specialization != null && !specialization.isEmpty()) {
      return ResponseEntity.ok(patientService.getDoctorsBySpecialization(specialization));
    }
    return ResponseEntity.ok(patientService.getAllDoctors());
  }

  @GetMapping("/specializations")
  public ResponseEntity<List<String>> getAllSpecializations() {
    return ResponseEntity.ok(patientService.getAllSpecializations());
  }

  @PostMapping("/appointments")
  public ResponseEntity<?> bookAppointment(
      @AuthenticationPrincipal User user,
      @Valid @RequestBody AppointmentRequest request) {
    try {
      Appointment appointment = patientService.bookAppointment(user, request);
      return ResponseEntity.ok(appointment);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @GetMapping("/appointments")
  public ResponseEntity<List<Appointment>> getMyAppointments(@AuthenticationPrincipal User user) {
    return ResponseEntity.ok(patientService.getMyAppointments(user.getId()));
  }

  @DeleteMapping("/appointments/{id}")
  public ResponseEntity<?> cancelAppointment(
      @PathVariable Long id,
      @AuthenticationPrincipal User user) {
    try {
      patientService.cancelAppointment(id, user.getId());
      return ResponseEntity.ok(new MessageResponse("Appointment cancelled successfully"));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }
}
