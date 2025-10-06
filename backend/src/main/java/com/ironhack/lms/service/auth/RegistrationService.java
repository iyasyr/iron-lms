package com.ironhack.lms.service.auth;

import com.ironhack.lms.domain.user.Role;
import com.ironhack.lms.domain.user.Student;
import com.ironhack.lms.domain.user.User;
import com.ironhack.lms.repository.user.UserRepository;
import com.ironhack.lms.web.auth.dto.RegisterRequest;
import com.ironhack.lms.web.auth.dto.RegisterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AppUserDetailsService userDetailsService;

    public RegisterResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
        }

        // Create new student user
        Student student = new Student();
        student.setEmail(request.email());
        student.setFullName(request.fullName());
        student.setPasswordHash(passwordEncoder.encode(request.password()));
        student.setRole(Role.STUDENT);
        // createdAt will be set by @PrePersist

        // Save user
        User savedUser = userRepository.save(student);

        // Generate JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        String token = jwtService.generateToken(userDetails);

        // Return response
        return new RegisterResponse(
            token,
            new RegisterResponse.UserInfo(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole().name()
            )
        );
    }
}