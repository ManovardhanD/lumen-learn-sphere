package com.example.backend.auth.dto;

import com.example.backend.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthDtos {
    public static class LoginRequest {
        @Email @NotBlank
        public String email;
        @NotBlank
        public String password;
    }

    public static class SignupRequest {
        @Email @NotBlank
        public String email;
        @NotBlank
        public String password;
        @NotBlank
        public String firstName;
        @NotBlank
        public String lastName;
        public Role role; // optional, defaults to STUDENT
    }

    public static class LoginResponse {
        public String token;
        public UserDto user;
    }

    public static class UserDto {
        public Long id;
        public String email;
        public String firstName;
        public String lastName;
        public Role role;
        public String createdAt;
    }
}

