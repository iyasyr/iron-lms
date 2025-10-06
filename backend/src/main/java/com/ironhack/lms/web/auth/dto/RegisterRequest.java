package com.ironhack.lms.web.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "User registration request")
public record RegisterRequest(
        @Schema(description = "User's full name", example = "John Doe", required = true)
        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 255, message = "Full name must be between 2 and 255 characters")
        String fullName,
        
        @Schema(description = "User's email address", example = "student@ironhack.com", required = true)
        @Email(message = "Please provide a valid email address")
        @NotBlank(message = "Email is required")
        String email,
        
        @Schema(description = "User's password", example = "securePassword123", required = true)
        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters long")
        String password
) {}

