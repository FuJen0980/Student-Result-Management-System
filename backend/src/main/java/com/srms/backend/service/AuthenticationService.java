package com.srms.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.srms.backend.model.AuthenticationRequest;
import com.srms.backend.model.AuthenticationResponse;
import com.srms.backend.model.RegisterRequest;
import com.srms.backend.model.Role;
import com.srms.backend.model.User;
import com.srms.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        String roleString = request.getRole();
        Role role = Role.valueOf(roleString.toUpperCase());
        if(role == null) {
            role = Role.STUDENT;
        }
        var user = User.builder()
            .name(request.getName())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(role)
            .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getName(),
                request.getPassword()
            )
        );
        var user = userRepository.findByName(request.getName())
            .orElseThrow(() -> new RuntimeException("User not found: " + request.getName()));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }
}
