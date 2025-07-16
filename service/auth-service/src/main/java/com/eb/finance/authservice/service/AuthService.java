package com.eb.finance.authservice.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.eb.finance.entity.user.UserAuth;
import com.eb.finance.authservice.repository.UserAuthRepository;
import com.eb.finance.dto.user.UserProfileCreateRequest;
import com.eb.security.jwt.JwtUtils;
import com.eb.finance.authservice.feign.UserServiceClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthService {
    private final UserAuthRepository userRepository;
    private final UserServiceClient userServiceClient;
    private final BCryptPasswordEncoder passwordEncoder;
    private JwtUtils jwtUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserAuthRepository userRepository, UserServiceClient userServiceClient, JwtUtils jwtUtils, BCryptPasswordEncoder passwordEncoder) {
        this.userServiceClient = userServiceClient;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(String email, String password, String firstName, String lastName) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        String hashed = passwordEncoder.encode(password);
        UserAuth user = UserAuth.builder().email(email).password(hashed).build();
        userRepository.save(user);

        try {
            logger.info("Creating profile with email={}, firstName={}, lastName={}", email, firstName, lastName);
            userServiceClient.createProfile(new UserProfileCreateRequest(email, firstName, lastName));
        } catch (Exception ex) {
            userRepository.delete(user);
            throw new RuntimeException("Failed to create profile, registration rolled back");
        }
    }

    public String login(String email, String password) {
        Optional<UserAuth> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtils.generateToken(email);
    }
}
