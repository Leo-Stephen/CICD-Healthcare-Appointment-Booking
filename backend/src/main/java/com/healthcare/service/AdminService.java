package com.healthcare.service;

import com.healthcare.entity.Appointment;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.User;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private DoctorRepository doctorRepository;

  @Autowired
  private AppointmentRepository appointmentRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public List<User> getUsersByRole(User.Role role) {
    return userRepository.findByRole(role);
  }

  public User createDoctor(User user, Doctor doctorProfile) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    user.setRole(User.Role.DOCTOR);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setIsActive(true);
    user = userRepository.save(user);

    doctorProfile.setUser(user);
    doctorRepository.save(doctorProfile);

    return user;
  }

  public Doctor updateDoctor(Long doctorId, Doctor updatedDoctor) {
    Doctor doctor = doctorRepository.findById(doctorId)
        .orElseThrow(() -> new RuntimeException("Doctor not found"));

    doctor.setSpecialization(updatedDoctor.getSpecialization());
    doctor.setQualification(updatedDoctor.getQualification());
    doctor.setExperienceYears(updatedDoctor.getExperienceYears());
    doctor.setConsultationFee(updatedDoctor.getConsultationFee());
    doctor.setBio(updatedDoctor.getBio());

    return doctorRepository.save(doctor);
  }

  public void deleteUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getRole() == User.Role.ADMIN) {
      throw new RuntimeException("Cannot delete admin user");
    }

    userRepository.delete(user);
  }

  public Map<String, Object> getAnalytics() {
    Map<String, Object> analytics = new HashMap<>();

    long totalPatients = userRepository.findByRole(User.Role.PATIENT).size();
    long totalDoctors = userRepository.findByRole(User.Role.DOCTOR).size();
    long totalAppointments = appointmentRepository.count();
    long pendingAppointments = appointmentRepository.findByStatus(Appointment.AppointmentStatus.PENDING).size();
    long approvedAppointments = appointmentRepository.findByStatus(Appointment.AppointmentStatus.APPROVED).size();
    long completedAppointments = appointmentRepository.findByStatus(Appointment.AppointmentStatus.COMPLETED).size();

    analytics.put("totalPatients", totalPatients);
    analytics.put("totalDoctors", totalDoctors);
    analytics.put("totalAppointments", totalAppointments);
    analytics.put("pendingAppointments", pendingAppointments);
    analytics.put("approvedAppointments", approvedAppointments);
    analytics.put("completedAppointments", completedAppointments);

    return analytics;
  }
}
