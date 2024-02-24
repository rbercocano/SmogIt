import CryptoJS from 'crypto-js';
const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, process.env.REACT_APP_ENCRYPTION_KEY).toString();
};

const decrypt = (text) => {
    return CryptoJS.AES.decrypt(text, process.env.REACT_APP_ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
};
const generateEncryptedApiKey = (timestamp) => {
    const inputString = `${process.env.REACT_APP_API_CLIENT_ID}${process.env.REACT_APP_API_CLIENT_SECRET}${timestamp}`;
    const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_API_CLIENT_SECRET);
    const message = CryptoJS.enc.Utf8.parse(inputString);
    const hash = CryptoJS.HmacSHA256(message, key);
    const base64 = CryptoJS.enc.Base64.stringify(hash);
    return base64;
}
export { encrypt, decrypt, generateEncryptedApiKey };