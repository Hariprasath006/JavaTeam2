package com.example.CampusJava.controller;

import com.example.CampusJava.dto.LoginRequest;
import com.example.CampusJava.model.User;
import com.example.CampusJava.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = repo.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body("User not found ❌");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid password ❌");
        }

        if (!user.getRole().equalsIgnoreCase(request.getRole())) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid role ❌");
        }

        return ResponseEntity.ok("Login Success ✅");
    }
}
