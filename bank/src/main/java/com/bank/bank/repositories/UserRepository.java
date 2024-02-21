package com.bank.bank.repositories;
import com.bank.bank.entity.Account;
import com.bank.bank.entity.Transaction;
import com.bank.bank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {}
