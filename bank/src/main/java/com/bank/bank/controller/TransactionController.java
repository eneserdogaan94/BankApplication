package com.bank.bank.controller;

import com.bank.bank.entity.Transaction;
import com.bank.bank.service.TransactionService;
import com.bank.bank.service.TransferRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {


    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transfer")
    public Transaction initiateTransfer(@RequestBody TransferRequest transferRequest) {
        return transactionService.createTransaction(
                transferRequest.getFromAccountNumber(),
                transferRequest.getToAccountNumber(),
                transferRequest.getAmount()
        );
    }

    @GetMapping("/account/{accountName}")
    public List<Transaction> getTransactionHistory(@PathVariable String accountName) {
        return transactionService.getTransactionsByAccountName(accountName);
    }
}