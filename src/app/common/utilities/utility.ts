import * as CryptoJS from 'crypto-js';

const secretKey = 'tours-360-jjgc';
const id = '1';

const encriptar = (text: string) => {

    const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
    const encryptedUrlSafe = encodeURIComponent(encrypted);
    return encryptedUrlSafe;
}
const desencriptar = (textEncrypted: string) => {
    const decryptedBytes = CryptoJS.AES.decrypt(decodeURIComponent(textEncrypted), secretKey);
    const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedId;
}

export {
    encriptar, desencriptar
}