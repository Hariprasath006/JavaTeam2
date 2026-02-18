package com.example.CampusJava.repository;

import com.example.CampusJava.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, UUID> {

    List<User> findByStatus(String status);

    // ✅ LOGIN SUPPORT 🔥
    User findByEmail(String email);
}
