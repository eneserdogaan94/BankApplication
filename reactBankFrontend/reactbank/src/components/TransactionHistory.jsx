import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TransactionHistory.css'

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [accountName,setAccountName] = useState(localStorage.getItem('accountName'))
    useEffect(() => {
        
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/transactions/account/${accountName}`);
                setTransactions(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [accountName]);

    return (
        <div className="transaction-list-container">
            <h2>Transaction History for {accountName}</h2>
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
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.from.name}</td>
                            <td>{transaction.from.number}</td>
                            <td>{transaction.to.name}</td>
                            <td>{transaction.to.number}</td>
                            <td>{transaction.to.createdAt}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistory;