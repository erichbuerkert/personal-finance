package com.eb.finance.dto.user;

import com.eb.finance.entity.user.UserProfile;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;

    public static UserProfileResponse from(UserProfile profile) {
        return UserProfileResponse.builder()
                .email(profile.getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .phoneNumber(profile.getPhoneNumber())
                .build();
    }
}
