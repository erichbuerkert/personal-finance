package com.eb.finance.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import com.eb.finance.dto.auth.AuthRequest;
import com.eb.finance.dto.auth.AuthResponse;
import com.eb.finance.dto.user.CompositeRegisterRequest;
import com.eb.finance.authservice.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody CompositeRegisterRequest request) {
        authService.register(request.getEmail(), request.getPassword(), request.getFirstName(), request.getLastName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
