package com.bank.bank.repository;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByUserId(String userId);
}
