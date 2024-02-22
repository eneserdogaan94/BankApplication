package com.bank.bank.repository;

import com.bank.bank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(UUID accountId);

    @Query("SELECT t FROM Transaction t WHERE t.from.id = :accountId OR t.to.id = :accountId")
    List<Transaction> findTransactionsByAccountId(@Param("accountId") UUID accountId);
}