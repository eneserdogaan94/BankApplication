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
    const [email,setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username,
                password,
                email,
            });
            if (response && response.data) {
                navigate('/');
                alertify('Registered:', response.data);
            } else {
                alertify('Unexpected response format');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage('Register failed: ' + error.response.data.message);
            } else {
                setErrorMessage('Register failed: ' + error.message);
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleChange}>
                <h1>Register</h1>
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
                    <FaUser className='icon'/>
                    <input
                        type="text"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit">Register</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default ForgotPassword;