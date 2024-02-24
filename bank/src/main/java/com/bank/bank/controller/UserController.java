package com.bank.bank.controller;

import com.bank.bank.entity.LoginRequest;
import com.bank.bank.entity.User;
import com.bank.bank.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Kullanıcı kaydı
    @PostMapping("/register")
    public User registerUser(@RequestBody @NotNull User user) {
        User userControl=userRepository.findByUsername(user.getUsername());
        if (userControl==null){
            return userRepository.save(user);
        }else{
            return null;
        }
    }

    @PostMapping("/changePassword")
    public User changePassword(@RequestBody @NotNull User user) {
        User userControl=userRepository.findByUsername(user.getUsername());
        if(userControl!=null){
            User changedPasswordUser=userRepository.findByUsername(user.getUsername());
            changedPasswordUser.setPassword(user.getPassword());
            return userRepository.save(changedPasswordUser);
        }else{
            return null;
        }

    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest loginRequest) throws Throwable {
        try {
            User autherizedUser = userRepository.findByUsername(loginRequest.getUsername());
            if (autherizedUser != null && autherizedUser.getPassword().equals(loginRequest.getPassword())) {
                System.out.println(autherizedUser);
                return autherizedUser;
            }else {
                System.err.println("User no exist.");
                return null;
            }
        }catch (Exception e){
            throw e.fillInStackTrace();
        }
    }
}