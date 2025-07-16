package com.eb.finance.dto.user;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class CompositeRegisterRequest {
    @Email @NotBlank private String email;
    @NotBlank private String password;
    @NotBlank private String firstName;
    @NotBlank private String lastName;
}
