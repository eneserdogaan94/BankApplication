package com.bank.bank.controller;

import com.bank.bank.model.request.LoginRequest;
import com.bank.bank.entity.User;
import com.bank.bank.model.response.JwtAuthenticationResponse;
import com.bank.bank.repository.UserRepository;
import com.bank.bank.security.JwtTokenProvider;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;


    @Autowired
    public UserController(JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody @NotNull User user) {
        User userControl=userRepository.findByUsername(user.getUsername());
        if (userControl==null){
            return userRepository.save(user);
        }else{
            return null;
        }
    }
    @PostMapping("/getUserByUserName")
    public User getUserByUserName(@RequestBody @NotNull String userName){
        User user= userRepository.findByUsername(userName);
        return user;
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
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User autherizedUser = userRepository.findByUsername(loginRequest.getUsername());
        if (autherizedUser != null && autherizedUser.getPassword().equals(loginRequest.getPassword())) {
            String token = jwtTokenProvider.generateToken(autherizedUser.getUsername());
            return ResponseEntity.ok(new JwtAuthenticationResponse(token, autherizedUser.getUsername(), autherizedUser.getPassword(),autherizedUser.getId().toString()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}