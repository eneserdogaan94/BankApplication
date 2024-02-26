package com.bank.bank.controller;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.User;
import com.bank.bank.repository.AccountRepository;
import com.bank.bank.service.AccountService;
import com.bank.bank.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/createAccount")
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @PutMapping("/accountUpdate/{id}")
    public Account updateAccount(@RequestBody Account account) {

        Account updateAccount = accountRepository.findById(account.getId());
        updateAccount.setBalance(account.getBalance());
        updateAccount.setName(account.getName());
        updateAccount.setNumber(account.getNumber());
        updateAccount.setCreatedAt(LocalDateTime.now());
        updateAccount.setUpdatedAt(LocalDateTime.now());
        return accountRepository.save(updateAccount);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);
        accountRepository.deleteById(uuid);
    }

    @GetMapping("/by-id/{id}")
    public Account getAccountById(@PathVariable UUID id) {
        return accountRepository.findById(id);
    }

    @GetMapping("/by-username-list/{userName}")
    public List<Account> getAccountByUserName(@PathVariable("userName") String userName) {
        User user = userService.getUserByUsername(userName);
        List<Account> accounts=accountRepository.findByUserId(user.getId());
        return accounts;
    }
    @GetMapping("/by-number/{number}")
    public  Account getAccountByNumber(@PathVariable("number") String number){
        Account account=accountService.getAccountByNumber(number);
        return account;
    }

}