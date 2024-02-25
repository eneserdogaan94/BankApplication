package com.bank.bank.repository;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, String> {
    List<Account> findByUserId(UUID userId);

    Account findById(UUID accountId);

    Account findByNumber(String number);
}
