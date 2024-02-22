package com.bank.bank.controller;

import com.bank.bank.entity.Account;
import com.bank.bank.repository.AccountRepository;
import com.bank.bank.repository.UserRepository;
import com.bank.bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserService userService;

    // Hesap oluşturma
    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    // Hesap güncelleme
    @PutMapping("/{id}")
    public Account updateAccount(@PathVariable String id, @RequestBody Account accountDetails) {
        // Hesap güncelleme işlemleri
        Account updateAccount=accountRepository.getReferenceById(id);
        updateAccount.setUser(accountDetails.getUser());
        updateAccount.setBalance(accountDetails.getBalance());
        updateAccount.setName(accountDetails.getName());
        updateAccount.setNumber(accountDetails.getNumber());
        return accountRepository.save(updateAccount);
    }

    // Hesap silme
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable String id) {
        accountRepository.deleteById(id);
    }

    // Hesap detaylarını görüntüleme
    @GetMapping("/{id}")
    public Account getAccountById(@PathVariable String id) {
        return (Account) accountRepository.findById(id).orElse(null);
    }
}