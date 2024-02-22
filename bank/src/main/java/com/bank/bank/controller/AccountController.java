package com.bank.bank.controller;

import com.bank.bank.entity.Account;
import com.bank.bank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    // Hesap oluşturma
    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    // Hesap güncelleme
    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable UUID id, @RequestBody Account accountDetails) {
        // Hesap güncelleme işlemleri
        accountDetails.setId(id);
        return accountRepository.save(accountDetails);
    }

    // Hesap silme
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable UUID id) {
        accountRepository.deleteById(id);
    }

    // Hesap detaylarını görüntüleme
    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable UUID id) {
        return (Account) accountRepository.findById(id).orElse(null);
    }
}