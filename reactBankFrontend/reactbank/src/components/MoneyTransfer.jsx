import React, { useState } from 'react';
import axios from 'axios';
import '../css/MoneyTransfer.css'; // Stil dosyasını import et

function MoneyTransfer() {
    const [fromAccountNumber, setFromAccountNumber] = useState(localStorage.getItem('accountNumber'));
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
            console.log('Transfer successful:', response.data);
            // İsteğe bağlı: Başarılı transfer sonrası işlemler
        } catch (error) {
            console.error('Error during transfer:', error);
            // İsteğe bağlı: Hata durumunda işlemler
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