package com.bank.bank.repository;

import com.bank.bank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);
}
