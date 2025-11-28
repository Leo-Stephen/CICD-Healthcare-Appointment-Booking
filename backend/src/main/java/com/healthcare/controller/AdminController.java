package com.healthcare.controller;

import com.healthcare.dto.MessageResponse;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.User;
import com.healthcare.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  private AdminService adminService;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers(
      @RequestParam(required = false) String role) {
    if (role != null) {
      return ResponseEntity.ok(adminService.getUsersByRole(User.Role.valueOf(role.toUpperCase())));
    }
    return ResponseEntity.ok(adminService.getAllUsers());
  }

  @PostMapping("/doctors")
  public ResponseEntity<?> createDoctor(
      @RequestBody Map<String, Object> request) {
    try {
      // Extract user details
      User user = new User();
      user.setEmail((String) request.get("email"));
      user.setPassword((String) request.get("password"));
      user.setFullName((String) request.get("fullName"));
      user.setPhone((String) request.get("phone"));

      // Extract doctor details
      Doctor doctor = new Doctor();
      doctor.setSpecialization((String) request.get("specialization"));
      doctor.setQualification((String) request.get("qualification"));
      doctor.setExperienceYears((Integer) request.get("experienceYears"));

      User created = adminService.createDoctor(user, doctor);
      return ResponseEntity.ok(created);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @PutMapping("/doctors/{id}")
  public ResponseEntity<?> updateDoctor(
      @PathVariable Long id,
      @RequestBody Doctor doctor) {
    try {
      Doctor updated = adminService.updateDoctor(id, doctor);
      return ResponseEntity.ok(updated);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    try {
      adminService.deleteUser(id);
      return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }

  @GetMapping("/analytics")
  public ResponseEntity<Map<String, Object>> getAnalytics() {
    return ResponseEntity.ok(adminService.getAnalytics());
  }
}
