import axios from "axios";

const url = import.meta.env.VITE_URL_BACKEND;

console.log(url);

const instance = axios.create({

    baseURL: url ? url : "https://think-edu.onrender.com/",
    timeout: 4000,
    headers: ['content-type":"aplication/json']
});


export default instance 