import axios from "axios";

const url = import.meta.env.VITE_API_URL || "https://think-edu.vercel.app/api";

console.log("Backend URL", url);

const instance = axios.create({

    baseURL: url, 
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});


export default instance 

