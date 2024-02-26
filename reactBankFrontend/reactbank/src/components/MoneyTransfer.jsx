import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../css/MoneyTransfer.css';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function MoneyTransfer({selectedAccount}) {
    const [fromAccountNumber, setFromAccountNumber] = useState('');
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [amount, setAmount] = useState(0);
    useEffect( () => {
       setFromAccountNumber(selectedAccount.number);
    }, [selectedAccount.number]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/transactions/transfer', {
                fromAccountNumber,
                toAccountNumber,
                amount
            });
            if(response.data.status==="SUCCESS"){
                alertify.success('Transfer successful');
            }else{
                alertify.error('Transfer error. Please Check Receiver Name or your balance.')
            }
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