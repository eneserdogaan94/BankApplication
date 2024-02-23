import React, { useState,useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsCurrencyExchange, BsWallet} from 'react-icons/bs'
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
 import '../css/Dashboard.css';
 import axios from 'axios';
function Home() {

    const [balance, setBalance]=useState(null);
    const [username, setUsername] = useState('');
    const [accountName, setAccountName] = useState('');
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
    }, []);
    useEffect(() => {
        const fetchAccountBalance = async () => {
            if (username) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/accounts/by-username/${username}`);
                    console.log(response.data);
                    setBalance(response.data.balance);
                    setAccountName(response.data.name);
                    localStorage.setItem('accountName',response.data.name)
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }
        };

        fetchAccountBalance();
    }, [username]); 
    
    const data = [
        {
          name: 'Jan',
          Expense: 4000,
          Income: 2400,
          amt: 2400,
        },
        {
          name: 'Feb',
          Expense: 3000,
          Income: 1398,
          amt: 2210,
        },
        {
          name: 'Mar',
          Expense: 2000,
          Income: 9800,
          amt: 2290,
        },
        {
          name: 'Apr',
          Expense: 2780,
          Income: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          Expense: 1890,
          Income: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          Expense: 2390,
          Income: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          Expense: 3490,
          Income: 4300,
          amt: 2100,
        },
        {
            name: 'August',
            Expense: 3490,
            Income: 3300,
            amt: 2100,
          },
          {
            name: 'September',
            Expense: 3490,
            Income: 5600,
            amt: 2100,
          },
          {
            name: 'October',
            Expense: 3390,
            Income: 7300,
            amt: 2100,
          },
          {
            name: 'November',
            Expense: 2345,
            Income: 12032,
            amt: 2100,
          },
          {
            name: 'December',
            Expense: 7300,
            Income: 12032,
            amt: 2100,
          },
      ];
    

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
                <h1>{balance !== null ? <p>₺{balance}</p> : <p>Loading...</p>}</h1>
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

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Income" fill="#8884d8" />
                <Bar dataKey="Expense" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home