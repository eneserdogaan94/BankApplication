import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/NewAccount.css'; // Stil dosyasını import et

function NewAccount() {
    const [accountName, setAccountName] = useState('');
    const [userId,setUserId] =useState('');
    const [number,setNumber] =useState('')

    useEffect(() => {
        setUserId(localStorage.getItem('id'));
    }, []);
    
    const handleSubmit = async (e) => {
       
        console.log(userId)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/accounts/createAccount', {
                name: accountName,
                balance: 0,
                userId:userId,
                number:number,


            });
            console.log('Account created:', response.data);
        } catch (error) {
            console.error('Error creating account:', error);
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