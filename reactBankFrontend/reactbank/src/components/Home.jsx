import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import NewAccount from './NewAccount';
import MoneyTransfer from './MoneyTransfer';
import TransactionList from './TransactionHistory';
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
            case 'NewAccount':
                return <NewAccount />;
            case 'MoneyTransfer':
                return <MoneyTransfer />;
            case 'TransactionHistory':
                return <TransactionList />;
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