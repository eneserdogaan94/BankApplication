package com.bank.bank.controller;

import com.bank.bank.entity.User;
import com.bank.bank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        User autherizedUser = userRepository.findById(user.getId()).orElse(null);
        if (autherizedUser != null) {
            return user;
        } else
            return null;
    }
}