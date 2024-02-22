import React from 'react';
import { Link } from 'react-router-dom';

function Menubar() {
    return (
        <nav className="menubar">
            <ul>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Menubar;