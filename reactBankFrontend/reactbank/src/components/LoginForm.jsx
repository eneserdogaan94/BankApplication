import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password
            });
            if (response && response.data) {
                // Giriş başarılı, JWT'yi saklayabilir ve kullanıcıyı yönlendirebilirsiniz
                console.log('Login successful:', response.data);
            } else {
                // Yanıt beklenen formatta değil
                console.log('Unexpected response format');
            }
        } catch (error) {
            // Hata mesajını göster
            if (error.response && error.response.data) {
                setErrorMessage('Login failed: ' + error.response.data.message);
            } else {
                setErrorMessage('Login failed: ' + error.message);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default LoginForm;