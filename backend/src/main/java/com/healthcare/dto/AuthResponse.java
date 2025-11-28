package com.healthcare.dto;

import com.healthcare.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String email;
  private String fullName;
  private User.Role role;

  public AuthResponse(String token, Long id, String email, String fullName, User.Role role) {
    this.token = token;
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.role = role;
  }
}
