import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {FaUser , FaLock } from "react-icons/fa";
import '../css/LoginForm.css'
import { useNavigate } from 'react-router-dom';

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
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id',response.data.id);
                    localStorage.setItem('password',response.data.password);
                navigate('/home');
                console.log('Login successful:', response.data);
            } else {
                console.log('Unexpected response format');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage('Login failed: ' + error.response.data.message);
            } else {
                setErrorMessage('Login failed: ' + error.message);
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