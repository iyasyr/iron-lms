package com.ironhack.lms.web.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "User login request")
public record LoginRequest(
        @Schema(description = "User's email address", example = "student@ironhack.com", required = true)
        @Email(message = "Please provide a valid email address")
        @NotBlank(message = "Email is required")
        String email,
        
        @Schema(description = "User's password", example = "securePassword123", required = true)
        @NotBlank(message = "Password is required")
        String password
) {}