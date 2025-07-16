package com.eb.finance.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileCreateRequest {
    @Email @NotBlank private String email;
    @NotBlank private String firstName;
    @NotBlank private String lastName;
}