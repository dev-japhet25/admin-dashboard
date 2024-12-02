import CryptoJS from 'crypto-js';

const secretKey = (process.env.NEXT_PUBLIC_API_TOKEN, 'secret')

const encrypt = (data:string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decrypt = (data:string) => {
  return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
};



export { encrypt, decrypt };