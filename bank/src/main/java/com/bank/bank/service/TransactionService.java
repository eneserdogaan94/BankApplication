package com.bank.bank.service;

import com.bank.bank.entity.Account;
import com.bank.bank.entity.Transaction;
import com.bank.bank.repository.AccountRepository;
import com.bank.bank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public Transaction createTransaction(String fromAccountNumber, String toAccountNumber, BigDecimal amount) {
        Account fromAccount = accountRepository.findByNumber(fromAccountNumber);
        Account toAccount = accountRepository.findByNumber(toAccountNumber);

        if (fromAccount.getBalance().compareTo(amount) >= 0 && toAccount != null){
            fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
            toAccount.setBalance(toAccount.getBalance().add(amount));

            accountRepository.save(fromAccount);
            accountRepository.save(toAccount);

            Transaction transaction = new Transaction();
            transaction.setFrom(fromAccount);
            transaction.setTo(toAccount);
            transaction.setAmount(amount);
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setStatus("SUCCESS");

            return transactionRepository.save(transaction);
        } else if(toAccount == null || fromAccount.getBalance().compareTo(amount) <= 0) {
            Transaction transaction = new Transaction();
            transaction.setFrom(fromAccount);
            transaction.setTo(null);
            transaction.setAmount(amount);
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setStatus("Failed");
            transactionRepository.save(transaction);
            return transactionRepository.save(transaction);
        }
        else
            throw new RuntimeException("There is something problem.");
    }

    public List<Transaction> getTransactionsByAccountId(UUID accountId) {
        return transactionRepository.findByAccountId(accountId);
    }
    public List<Transaction> getTransactionsByAccountName(String accountName) {
        return transactionRepository.findByAccountName(accountName);
    }
}