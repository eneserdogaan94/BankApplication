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
    public Transaction createTransaction(UUID fromAccountId, UUID toAccountId, BigDecimal amount) {
        Account fromAccount = accountRepository.findById(fromAccountId).orElseThrow();
        Account toAccount = accountRepository.findById(toAccountId).orElseThrow();

        if (fromAccount.getBalance().compareTo(amount) >= 0) {
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
        } else {
            throw new RuntimeException("Insufficient balance");
        }
    }

    public List<Transaction> getTransactionsByAccountId(UUID accountId) {
        return transactionRepository.findTransactionsByAccountId(accountId);
    }
}