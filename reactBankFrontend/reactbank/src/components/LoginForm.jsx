import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {FaUser , FaLock } from "react-icons/fa";
import '../css/LoginForm.css'
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { saveToLocalStorage } from '../services/LocalStorageService';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password
            });
            if (response && response.data) {
                    saveToLocalStorage('username',username);
                    saveToLocalStorage('token',response.data.token);
                    saveToLocalStorage('id',response.data.userId);
                    saveToLocalStorage('password',response.data.password);
                    alertify.success('Login Success');
                navigate('/home');
            } else {
                alertify.error('Your username or password wrong.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage('Login failed: ' + error.response.data.message);
                alertify.error('Login unsuccess.');
            } else {
                setErrorMessage('Login failed: ' + error.message);
                alertify.error('Login unsuccess.');
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <h1>Mini Bank</h1>
                <h1>Login</h1>
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
                    <a href="/forgotPassword">Forgot Password</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href='/register'>Register</a></p>
                </div>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default LoginForm;