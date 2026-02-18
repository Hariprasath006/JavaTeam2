package com.example.CampusJava.controller;

import com.example.CampusJava.model.User;
import com.example.CampusJava.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));
    }

    @GetMapping("/status/{status}")
    public List<User> filterByStatus(@PathVariable String status) {
        return repo.findByStatus(status);
    }

    // ✅ ONLY ONE POST METHOD 🔥
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {

        try {
            User savedUser = repo.save(user);
            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Email already exists ❌");
        }
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User user) {
        user.setId(id);
        return repo.save(user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable UUID id) {
        repo.deleteById(id);
        return "User Deleted ✅";
    }
}
