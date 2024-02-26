import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UpdateAccount.css'; // Update the CSS file path as needed
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateAccount({selectedAccount}) {
    const [accountName, setAccountName] = useState(selectedAccount.name);
    const [balance, setBalance] = useState(selectedAccount.balance);
    const [number, setNumber] = useState(selectedAccount.number);
    const navigate = useNavigate();
    useEffect(() => {
        if (selectedAccount) {
            setAccountName(selectedAccount.name);
            setBalance(selectedAccount.balance);
            setNumber(selectedAccount.number);
        }
    }, [selectedAccount]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/accounts/accountUpdate/${selectedAccount.id}`, {
                id:selectedAccount.id,
                name: accountName,
                balance: balance,
                userId: selectedAccount.userId,
                number: number,
            });

            alertify.success('Account updated successfully.');
            window.location.reload();
            navigate('/home');
        } catch (error) {
            alertify.error('Failed to update account. Please try again.');
        }
    };

    return (
        <div className="update-account-container">
            <h2>Update Account</h2>
            <form className="update-account-form" onSubmit={handleSubmit}>
                <label>
                    Account Name
                    <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Balance
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Identification Number
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Account</button>
            </form>
        </div>
    );
}

export default UpdateAccount;