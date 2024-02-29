import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TransactionHistory.css';

function TransactionHistory({selectedAccount}) {
    const [transactions, setTransactions] = useState([]);
    const [accountName,setAccountName] = useState();

    function formatDate(apiDate) {
        
        const result = apiDate.split('T')[0];
        return result;
    }
    function formatTime(apiDate) {
        
        const tIndex = apiDate.indexOf('T'); // 'T' harfinin indeksini bul
        const dotIndex = apiDate.indexOf('.', tIndex); // 'T' harfinden sonraki ilk '.' karakterinin indeksini bul
        const result = apiDate.substring(tIndex + 1, dotIndex); // 'T' harfinden '.' karakterine kadar olan kısmı al
        return result;
    }
    
    
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
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.from ? transaction.from.name : 'Unknown'}</td>
                        <td>{transaction.from ? transaction.from.number : 'Unknown'}</td>
                        <td>{transaction.to ? transaction.to.name : 'Unknown'}</td>
                        <td>{transaction.to ? transaction.to.number : 'Unknown'}</td>
                        <td>{formatDate(transaction.transactionDate)}</td>
                        <td>{formatTime(transaction.transactionDate)}</td>
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