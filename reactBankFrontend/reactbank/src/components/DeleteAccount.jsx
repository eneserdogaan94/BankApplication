import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../css/DeleteAccount.css'; // Update the CSS file path as needed
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { useNavigate } from 'react-router-dom';

function DeleteAccount({ selectedAccount,setSelectedAccount,accountList }) {
    const navigate = useNavigate();
    const [accountName, setAccountName] = useState(selectedAccount.name);
    const [balance, setBalance] = useState(selectedAccount.balance);
    const [number, setNumber] = useState(selectedAccount.number);
    useEffect(() => {
        if (selectedAccount) {
            setAccountName(selectedAccount.name);
            setBalance(selectedAccount.balance);
            setNumber(selectedAccount.number);
        }
    }, [selectedAccount]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/${selectedAccount.id}`);
            alertify.success('Account deleted successfully.');
            window.location.reload();
        } catch (error) {
            alertify.error('Failed to delete account. Please try again.');
        }
    };

    return (
        <div className="delete-account-container">
            <h2>Delete Account</h2>
            <div className="account-details">
                <p><strong>Account Name:</strong> {selectedAccount.name}</p>
                <p><strong>Balance:</strong> {selectedAccount.balance}</p>
                <p><strong>Identification Number:</strong> {selectedAccount.number}</p>
            </div>
            <button className="delete-button" onClick={handleDelete}>Delete Account</button>
        </div>
    );
}

export default DeleteAccount;