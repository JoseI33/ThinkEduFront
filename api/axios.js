import axios from "axios";

const url = import.meta.env.API_URL || "https://think-edu.vercel.app/";

console.log("Backend URL", url);

const instance = axios.create({

    baseURL: url, 
    timeout: 4000,
    headers: ["content-type:","aplication/json"]
});


export default instance 

