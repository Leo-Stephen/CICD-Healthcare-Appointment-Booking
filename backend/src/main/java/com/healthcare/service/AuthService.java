package com.healthcare.service;

import com.healthcare.dto.AuthResponse;
import com.healthcare.dto.LoginRequest;
import com.healthcare.dto.RegisterRequest;
import com.healthcare.entity.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider tokenProvider;

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    User user = new User();
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setFullName(request.getFullName());
    user.setPhone(request.getPhone());
    user.setRole(User.Role.PATIENT); // Default role for registration
    user.setIsActive(true);

    user = userRepository.save(user);

    String token = tokenProvider.generateToken(user);
    return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
  }

  public AuthResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("Invalid email or password"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
      throw new RuntimeException("Invalid email or password");
    }

    if (!user.getIsActive()) {
      throw new RuntimeException("Account is inactive");
    }

    String token = tokenProvider.generateToken(user);
    return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole());
  }
}
