import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPasword';
import Register from './components/RegisterForm';
import Home from './components/Home';
import './App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} /> 
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;