package com.bank.bank.repository;

import com.bank.bank.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t WHERE t.from.id = :accountId OR t.to.id = :accountId")
    List<Transaction> findByAccountId(@Param("accountId") UUID accountId);

    @Query("SELECT t FROM Transaction t LEFT JOIN t.from f LEFT JOIN t.to to WHERE f.name = :accountName OR to.name = :accountName OR f.name IS NULL OR to.name IS NULL")
    List<Transaction> findByAccountName(@Param("accountName") String accountName);
}