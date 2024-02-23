import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import AccountSettings from './AccountCreation';
import Transaction from './Transaction';
import TransactionList from './TransactionHistory';
import Settings from './Settings'
import '../css/Home.css';

function Home() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('Dashboard');

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleComponentChange = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'Dashboard':
                return <Dashboard />;
            case 'AccountSettings':
                return <AccountSettings />;
            case 'Transaction':
                return <Transaction />;
            case 'Transaction History':
                return <TransactionList />;
            case 'Settings':
                return <Settings />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onComponentChange={handleComponentChange} />
            {renderSelectedComponent()}
        </div>
    );
}

export default Home;