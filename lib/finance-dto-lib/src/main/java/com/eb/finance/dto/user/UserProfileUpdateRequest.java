package com.eb.finance.dto.user;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class UserProfileUpdateRequest {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    private String phoneNumber;
}
