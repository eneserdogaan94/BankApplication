import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {FaUser , FaLock } from "react-icons/fa";
import '../css/LoginForm.css'
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/changePassword', {
                username,
                password
            });
            if (response && response.data) {
                navigate('/');
                alertify.success('Password Changed.');
            } else {
                alertify.error('Username is not found.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alertify.error('something went wrong');
            } else {
                alertify.error('something went wrong');
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleChange}>
                <h1>Forgot Password</h1>
                <div className='input-box'>
                    <FaUser className='icon'/>
                    <input
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    
                </div>
                <div className='input-box'>
                    <FaLock className='icon'/>
                    <input
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="remember-forgot">
                    <a href="/">Return Login Page</a>
                </div>
                <button type="submit">Change Password</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default ForgotPassword;