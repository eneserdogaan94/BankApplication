import React, { useState } from 'react';
import axios from 'axios';
import '../css/MoneyTransfer.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from './LocalStorageService';

function MoneyTransfer() {
    const [fromAccountNumber, setFromAccountNumber] = useState(getFromLocalStorage('accountNumber'));
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/transactions/transfer', {
                fromAccountNumber,
                toAccountNumber,
                amount
            });
            alertify.success('Transfer successful:');
        } catch (error) {
            alertify.error('Error during transfer');
        }
    };

    return (
        <div className="money-transfer-container">
            <h2>Money Transfer</h2>
            <form className="money-transfer-form" onSubmit={handleSubmit}>
                <label>
                    Sender Account Number:
                    <input
                        type="text"
                        value={fromAccountNumber}
                        onChange={(e) => setFromAccountNumber(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Receiver Account Number:
                    <input
                        type="text"
                        value={toAccountNumber}
                        onChange={(e) => setToAccountNumber(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Transfer</button>
            </form>
        </div>
    );
}

export default MoneyTransfer;