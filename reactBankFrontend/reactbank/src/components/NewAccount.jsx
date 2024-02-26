import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/NewAccount.css'; // Stil dosyasını import et
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../services/LocalStorageService';

function NewAccount() {
    const [accountName, setAccountName] = useState('');
    const [userId,setUserId] =useState('');
    const [number,setNumber] =useState('')
    const navigate = useNavigate();
    useEffect(() => {
        setUserId(getFromLocalStorage('id'));
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/accounts/createAccount', {
                name: accountName,
                balance: 0,
                userId:userId,
                number:number,
            });

            alertify.success("Account created.");
            window.location.reload();
            navigate("/home");
        } catch (error) {
            alertify.error("Account can not create.Please try again.")
        }
    };

    return (
        
        <div className="new-account-container">
            <h2>New Account</h2>
            <form className="new-account-form" onSubmit={handleSubmit}>
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
                    Identification Number
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default NewAccount;