import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {FaUser , FaLock } from "react-icons/fa";
import '../css/LoginForm.css'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
    };
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        const savedToken = localStorage.getItem('token');
        if (savedUsername && savedToken && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            // Token'ı doğrulama veya kullanıcıyı otomatik olarak giriş yaptırma işlemleri
        }else{
            setErrorMessage("User unathorized.");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password
            });
            if (response && response.data) {
                if (rememberMe) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id',response.data.id);
                    localStorage.setItem('password',response.data.password);
                }
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
                    <label>
                    <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    />Remember Me
                    </label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href='#'>Register</a></p>
                </div>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default LoginForm;