import axios from "axios";

const instance = axios.create({
    baseURL: "https://think-edu.vercel.app/api",  
    withCredentials: true,  
});




export default instance 

