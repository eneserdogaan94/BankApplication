package com.bank.bank.controller;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.User;
import com.bank.bank.repository.AccountRepository;
import com.bank.bank.service.AccountService;
import com.bank.bank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    // Hesap oluşturma
    @PostMapping("/createAccount")
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    // Hesap güncelleme
    @PutMapping("/accountUpdate/{id}")
    public Account updateAccount(@PathVariable String id) {
        // Hesap güncelleme işlemleri
        Account updateAccount = accountRepository.getReferenceById(id);
        updateAccount.setUserId(updateAccount.getUserId());
        updateAccount.setBalance(updateAccount.getBalance());
        updateAccount.setName(updateAccount.getName());
        updateAccount.setNumber(updateAccount.getNumber());
        return accountRepository.save(updateAccount);
    }

    // Hesap silme
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable String id) {
        accountRepository.deleteById(id);
    }

    // Hesap detaylarını görüntüleme
    @GetMapping("/by-id/{id}")
    public Account getAccountById(@PathVariable String id) {
        return accountRepository.findById(id).orElse(null);
    }

    @GetMapping("/by-username/{userName}")
    public Account getAccountByUserName(@PathVariable("userName") String userName) {
        User user = userService.getUserByUsername(userName);
        Account account=accountRepository.findByUserId(user.getId());
        return account;

    }
    @GetMapping("/by-number/{number}")
    public  Account getAccountByNumber(@PathVariable("number") String number){
        Account account=accountService.getAccountByNumber(number);
        return account;
    }
}