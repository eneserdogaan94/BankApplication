package com.bank.bank.repository;

import com.bank.bank.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {

}
