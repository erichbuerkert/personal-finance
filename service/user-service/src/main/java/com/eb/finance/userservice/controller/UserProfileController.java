package com.eb.finance.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.eb.finance.dto.user.UserProfileCreateRequest;
import com.eb.finance.dto.user.UserProfileResponse;
import com.eb.finance.dto.user.UserProfileUpdateRequest;
import com.eb.finance.userservice.service.UserProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService service;

    @PostMapping
    public ResponseEntity<Void> createProfile(@Valid @RequestBody UserProfileCreateRequest req) {
        service.create(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile(Authentication auth) {
        var profile = service.getByEmail(auth.getName());
        return ResponseEntity.ok(UserProfileResponse.from(profile));
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateMyProfile(
            Authentication auth,
            @Valid @RequestBody UserProfileUpdateRequest req) {
        service.update(auth.getName(), req);
        return ResponseEntity.ok().build();
    }
}
