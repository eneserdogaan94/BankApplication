import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TransactionHistory.css';

function TransactionHistory({selectedAccount}) {
    const [transactions, setTransactions] = useState([]);
    const [accountName,setAccountName] = useState();

    
    
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/transactions/account/${selectedAccount.name}`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [selectedAccount.name]);

    return (
        <div className="transaction-list-container">
            <h2>Transaction History for {selectedAccount.name}</h2>
            <table className="transaction-list-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sender Name</th>
                        <th>Sender Number</th>
                        <th>Receiver Name</th>
                        <th>Receiver Number</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.from ? transaction.from.name : 'Belirsiz'}</td>
                        <td>{transaction.from ? transaction.from.number : 'Belirsiz'}</td>
                        <td>{transaction.to ? transaction.to.name : 'Belirsiz'}</td>
                        <td>{transaction.to ? transaction.to.number : 'Belirsiz'}</td>
                        <td>{transaction.transactionDate}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;