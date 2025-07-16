package com.eb.finance.userservice.service;

import com.eb.finance.entity.user.UserProfile;
import com.eb.finance.dto.user.UserProfileCreateRequest;
import com.eb.finance.dto.user.UserProfileUpdateRequest;
import com.eb.finance.userservice.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository repo;

    @Transactional
    public void create(UserProfileCreateRequest req) {
        UserProfile profile = UserProfile.builder()
                .email(req.getEmail())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .build();
        repo.save(profile);
    }

    @Transactional
    public void update(String email, UserProfileUpdateRequest req) {
        UserProfile profile = repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
        profile.setFirstName(req.getFirstName());
        profile.setLastName(req.getLastName());
        profile.setPhoneNumber(req.getPhoneNumber());
        // JPA dirty‑checks & flushes automatically
    }

    public UserProfile getByEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Profile not found"));
    }
}
