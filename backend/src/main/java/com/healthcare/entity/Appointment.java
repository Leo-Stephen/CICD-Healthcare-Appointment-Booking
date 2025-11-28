package com.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "patient_id", nullable = false)
  private User patient;

  @ManyToOne
  @JoinColumn(name = "doctor_id", nullable = false)
  private Doctor doctor;

  @Column(name = "appointment_date", nullable = false)
  private LocalDate appointmentDate;

  @Column(name = "appointment_time", nullable = false)
  private LocalTime appointmentTime;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private AppointmentStatus status = AppointmentStatus.PENDING;

  @Column(columnDefinition = "TEXT")
  private String reason;

  @Column(columnDefinition = "TEXT")
  private String notes;

  @Column(columnDefinition = "TEXT")
  private String prescription;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  public enum AppointmentStatus {
    PENDING, APPROVED, REJECTED, CANCELLED, COMPLETED
  }
}
