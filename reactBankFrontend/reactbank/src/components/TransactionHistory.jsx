import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TransactionHistory.css'

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [accountId,setAccountId] = useState([]);
    

    useEffect(() => {
        const fetchTransactions = async () => {
            setAccountId(localStorage.getItem('accountId'));
        };

        fetchTransactions();
    }, [accountId]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/transactions/account/${accountId}`);
                setTransactions(response.data);
                console.log(response.data)

            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="transaction-list-container">
            <h2>Transaction List</h2>
            <table className="transaction-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;