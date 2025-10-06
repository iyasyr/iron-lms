package com.ironhack.lms.web.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication response containing JWT token and user information")
public record LoginResponse(
        @Schema(description = "JWT token for API authentication", 
                example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                required = true)
        String token,
        
        @Schema(description = "User information", required = true)
        UserInfo user
) {
    @Schema(description = "User information")
    public record UserInfo(
            @Schema(description = "User ID", example = "1", required = true)
            Long id,
            
            @Schema(description = "User's email address", example = "student@ironhack.com", required = true)
            String email,
            
            @Schema(description = "User's full name", example = "John Doe", required = true)
            String fullName,
            
            @Schema(description = "User's role", example = "STUDENT", required = true)
            String role
    ) {}
}