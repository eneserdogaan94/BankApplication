package com.bank.bank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Account from;
    @ManyToOne
    private Account to;
    private BigDecimal amount;
    private LocalDateTime transactionDate;
    private String status;

    public Transaction(Long id, Account from, Account to, BigDecimal amount, LocalDateTime transactionDate, String status) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.transactionDate = LocalDateTime.now();
        this.status = "PENDING"; // Default Value
    }

    public Transaction() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Account getFrom() {
        return from;
    }

    public void setFrom(Account from) {
        this.from = from;
    }

    public Account getTo() {
        return to;
    }

    public void setTo(Account to) {
        this.to = to;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}