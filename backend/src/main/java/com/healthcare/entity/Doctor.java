package com.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  @Column(nullable = false)
  private String specialization;

  private String qualification;

  @Column(name = "experience_years")
  private Integer experienceYears;

  @Column(name = "consultation_fee")
  private BigDecimal consultationFee;

  @Column(columnDefinition = "TEXT")
  private String bio;

  @Column(name = "profile_image")
  private String profileImage;

  private BigDecimal rating = BigDecimal.ZERO;

  @Column(name = "total_reviews")
  private Integer totalReviews = 0;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
}
