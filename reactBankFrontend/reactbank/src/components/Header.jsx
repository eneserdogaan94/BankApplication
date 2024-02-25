import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import axios from 'axios';
 import '../css/Header.css';
 import { saveToLocalStorage, getFromLocalStorage } from '../services/LocalStorageService';

function Header({OpenSidebar}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState(getFromLocalStorage('accountList'));


    const getSelectedUser = async (accountId) => {
        if (accountId) {
            try {
                const response = await axios.get(`http://localhost:8080/api/accounts/by-id/${accountId}`);
                console.log(response.data);
                saveToLocalStorage('accountName',response.data.name);
                saveToLocalStorage('accountNumber',response.data.number);
                saveToLocalStorage('accountId',response.data.id);
            } catch (error) {
                console.error('Error fetching account balance:', error);
            }
        }
    };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    getSelectedUser(event.target.value);
    console.log(event.target.value);
    console.log(event.target.value);
  };


  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.clear();
      navigate("/");
  };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <div className="dropdown">
            <select value={selectedValue} onChange={handleChange}>
            <option value="">Change Account</option>
            {options.map((option, index) => (
            <option key={index} value={option.id}>
            {option.name}
            </option>
            ))}
            </select>
            </div>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            
            <BsPersonCircle className="icon" onClick={toggleMenu} />
            {isOpen && (
                <ul className="submenu">
                    <li onClick={handleLogout}>Çıkış Yap</li>
                </ul>
            )}
        </div>
    </header>
  )
}

export default Header