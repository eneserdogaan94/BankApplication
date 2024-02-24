package com.bank.bank.service;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.User;
import com.bank.bank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;


    public Account getAccountByNumber(String number) {
        return accountRepository.findByNumber(number);
    }

}
