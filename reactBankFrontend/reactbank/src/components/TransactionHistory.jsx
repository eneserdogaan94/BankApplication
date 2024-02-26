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
                        <td>{transaction.from ? transaction.from.name : 'Belirsiz'}</td>
                        <td>{transaction.from ? transaction.from.number : 'Belirsiz'}</td>
                        <td>{transaction.to ? transaction.to.name : 'Belirsiz'}</td>
                        <td>{transaction.to ? transaction.to.number : 'Belirsiz'}</td>
                        <td>{new Date(transaction.transtionDate).toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
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