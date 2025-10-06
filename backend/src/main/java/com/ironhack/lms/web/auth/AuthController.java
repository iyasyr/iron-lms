package com.ironhack.lms.web.auth;

import com.ironhack.lms.service.auth.LoginService;
import com.ironhack.lms.service.auth.RegistrationService;
import com.ironhack.lms.web.auth.dto.LoginRequest;
import com.ironhack.lms.web.auth.dto.LoginResponse;
import com.ironhack.lms.web.auth.dto.RegisterRequest;
import com.ironhack.lms.web.auth.dto.RegisterResponse;
import org.springframework.security.core.Authentication;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ironhack.lms.domain.user.User;
import com.ironhack.lms.repository.user.UserRepository;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "User authentication and authorization endpoints")
public class AuthController {

    private final RegistrationService registrationService;
    private final LoginService loginService;
    private final UserRepository userRepository;

    @Operation(
            summary = "User Registration",
            description = "Register a new user account. Creates a new student user and returns a JWT token for immediate authentication.",
            operationId = "register"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Registration successful",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = RegisterResponse.class),
                            examples = @ExampleObject(
                                    name = "Successful Registration",
                                    value = "{\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\", \"user\": {\"id\": 1, \"email\": \"student@ironhack.com\", \"fullName\": \"John Doe\", \"role\": \"STUDENT\"}}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "User already exists",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "User Exists",
                                    value = "{\"error\": \"User with this email already exists\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request format",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Validation Error",
                                    value = "{\"error\": \"Full name is required\"}"
                            )
                    )
            )
    })
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest req) {
        RegisterResponse response = registrationService.register(req);
        return ResponseEntity.status(201).body(response);
    }

    @Operation(
            summary = "User Login",
            description = "Authenticate a user with email and password. Returns a JWT token for API authentication.",
            operationId = "login"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = LoginResponse.class),
                            examples = @ExampleObject(
                                    name = "Successful Login",
                                    value = "{\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\", \"user\": {\"id\": 1, \"email\": \"student@ironhack.com\", \"fullName\": \"John Doe\", \"role\": \"STUDENT\"}}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Invalid credentials",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Invalid Credentials",
                                    value = "{\"error\": \"Invalid email or password\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid request format",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Validation Error",
                                    value = "{\"error\": \"Email is required\"}"
                            )
                    )
            )
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        LoginResponse response = loginService.login(req);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get Current User",
            description = "Get the current authenticated user's information. Requires a valid JWT token.",
            operationId = "getCurrentUser"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User information retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = User.class),
                            examples = @ExampleObject(
                                    name = "Current User",
                                    value = "{\"id\": 1, \"email\": \"student@ironhack.com\", \"fullName\": \"John Doe\", \"role\": \"STUDENT\"}"
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing token",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Unauthorized",
                                    value = "{\"error\": \"unauthorized\"}"
                            )
                    )
            )
    })
    @GetMapping("/me")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<User> getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
}