import React, { useState,useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsCurrencyExchange, BsWallet} from 'react-icons/bs'
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
 import '../css/Dashboard.css';
 import axios from 'axios';
function Home() {
    const [accounts, setAccounts] = useState([]);
    const [balance, setBalance]=useState(null);
    const [username, setUsername] = useState('');
    const [accountName, setAccountName] = useState('');
    const [userId, setUserId] = useState('');
    const [currencyData, setCurrencyData] = useState([
        {
            "CurrencyCode": "EUR",
            "RateDate": "2024-06-01T00:00:00+03:00",
            "SaleRate": "34.58195",
            "PurchaseRate": "35.62595"
        },
        {
            "CurrencyCode": "USD",
            "RateDate": "2024-06-01T00:00:00+03:00",
            "SaleRate": "31.086",
            "PurchaseRate": "32.02306"
        }
    ]);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrencyData(currentData =>
                currentData.map(currency => ({
                    ...currency,
                    PurchaseRate: (parseFloat(currency.PurchaseRate) + Math.random() * 0.1 - 0.05).toFixed(5)
                }))
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setUserId(localStorage.getItem('userId'));
    }, []);
    useEffect(() => {
        const fetchAccountBalance = async () => {
            if (username) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/accounts/by-username/${username}`);
                    console.log(response.data);
                    setAccounts(response.data);
                    setBalance(response.data.balance);
                    setAccountName(response.data.name);
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }
        };

        fetchAccountBalance();
    }, [username]); 
    useEffect(() => {
        const fetchAccountBalance = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/accounts/by-username/${username}`);
                    console.log(response.data);
                    setBalance(response.data.balance);
                    setAccountName(response.data.name);
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }
        };

        fetchAccountBalance();
    }, [userId]); 
    

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>Dashboard</h3>
        </div>

        <div className='main-cards'>
           
            <div className='card'>
                <div className='card-inner'>
                    <h3>Account</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{accountName}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Balance</h3>
                    <BsWallet className='card_icon'/>
                </div>
                <h1>{balance !== null ? <p>${balance}</p> : <p>Loading...</p>}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Currency</h3>
                    <BsCurrencyExchange className='card_icon'/>
                </div>
                {currencyData.map(currency => (
                <div key={currency.CurrencyCode}>
                    <p>{currency.CurrencyCode}: {currency.PurchaseRate}</p>
                </div>
            ))}
            </div>
        </div>
    </main>
  )
}

export default Home