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

    @Autowired
    private TransactionService transactionService;

    // Para transferi başlatma
    @PostMapping("/transfer")
    public Transaction initiateTransfer(@RequestBody TransferRequest transferRequest) {
        return transactionService.createTransaction(
                transferRequest.getFromAccountId(),
                transferRequest.getToAccountId(),
                transferRequest.getAmount()
        );
    }

    // İşlem geçmişini görüntüleme
    @GetMapping("/account/{accountId}")
    public List<Transaction> getTransactionHistory(@PathVariable UUID accountId) {
        return transactionService.getTransactionsByAccountId(accountId);
    }
}