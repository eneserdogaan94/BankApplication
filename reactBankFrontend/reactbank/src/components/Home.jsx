import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import Sidebar from './Sidebar';
import NewAccount from './NewAccount';
import MoneyTransfer from './MoneyTransfer';
import TransactionHistory from './TransactionHistory';
import '../css/Home.css';
import { getFromLocalStorage } from '../services/LocalStorageService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('Dashboard');
    const [selectedUser,setSelectedUser] = useState(null);
    const [accountList,setAccountList]= useState(null);
    const [selectedAccount,setSelectedAccount] = useState('');

    const navigate = useNavigate();

    useEffect( () => {
        const userName=getFromLocalStorage('username');
        if(userName==null){
            localStorage.removeItem('token');
            localStorage.clear();
            navigate("/login")
        }else{
            setSelectedUser(userName);
        }
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            if (selectedUser != null) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/accounts/by-username-list/${selectedUser}`);
                    const accountList = response.data;
                    setAccountList(accountList);
                    if (accountList.length > 0) {
                        setSelectedAccount(accountList[0]);
                    }
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }
        };
        fetchAccounts();
    }, [selectedUser]);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleComponentChange = (componentName) => {
        setSelectedComponent(componentName);
    };

    const renderSelectedComponent = (selectedAccount) => {
        switch (selectedComponent) {
            case 'Dashboard':
                return <Dashboard selectedAccount={selectedAccount} />;
            case 'NewAccount':
                return <NewAccount />;
            case 'MoneyTransfer':
                return <MoneyTransfer selectedAccount={selectedAccount} />;
            case 'TransactionHistory':
                return <TransactionHistory selectedAccount={selectedAccount} />;
            default:
                return <Dashboard selectedAccount={selectedAccount} />;
        }
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} setSelectedAccount={setSelectedAccount}  accountList={accountList}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onComponentChange={handleComponentChange} />
            {renderSelectedComponent(selectedAccount)}
        </div>
    );
}

export default Home;

