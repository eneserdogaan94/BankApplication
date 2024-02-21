package com.bank.bank.controllers;

import com.bank.bank.entity.User;
import com.bank.bank.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Kullanıcı kaydı
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Kullanıcı girişi (Basitleştirilmiş)
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        // Kullanıcı giriş işlemleri
        return user;
    }
}