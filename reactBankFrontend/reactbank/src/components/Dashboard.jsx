import React, { useState,useEffect } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

 import '../css/Dashboard.css';
 import axios from 'axios';
function Home() {

    const [balance, setBalance]=useState(null);
    const [username, setUsername] = useState('');
    const [accountName, setAccountName] = useState('');
    const [currencyData, setCurrencyData] = useState([
        {
            "CurrencyCode": "EUR",
            "RateDate": "2020-06-01T00:00:00+03:00",
            "SaleRate": "7.58195",
            "PurchaseRate": "7.62595"
        },
        {
            "CurrencyCode": "DKK",
            "RateDate": "2020-06-01T00:00:00+03:00",
            "SaleRate": "0.9984",
            "PurchaseRate": "1.0384"
        },
        {
            "CurrencyCode": "RUB",
            "RateDate": "2020-06-01T00:00:00+03:00",
            "SaleRate": "0.09465",
            "PurchaseRate": "0.09865"
        },
        {
            "CurrencyCode": "USD",
            "RateDate": "2020-06-01T00:00:00+03:00",
            "SaleRate": "6.8086",
            "PurchaseRate": "6.8486"
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
        }, 10000);

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
                } catch (error) {
                    console.error('Error fetching account balance:', error);
                }
            }
        };

        fetchAccountBalance();
    }, [username]); 
    
    const data = [
        {
          name: 'Ocak',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Şubat',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Mart',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Nisan',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Mayıs',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Ağustos',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Eylül',
          uv: 3490,
          pv: 4300,
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
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{balance !== null ? <p>${balance}</p> : <p>Loading...</p>}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Currency</h3>
                    <BsFillBellFill className='card_icon'/>
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
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
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
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home