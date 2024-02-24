import CryptoJS from 'crypto-js';

const secretKey = 'secretKey';

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const saveToLocalStorage = (key, data) => {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
};

export const getFromLocalStorage = (key) => {
    const encryptedData = localStorage.getItem(key);
    return encryptedData ? decryptData(encryptedData) : null;
};