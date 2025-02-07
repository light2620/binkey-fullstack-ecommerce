import axios from "axios";

const token = localStorage.getItem("authorization") // Get only the token part


const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers: {
        authorization: token ? token : "", // Correct format
   
    }
    
})

export {axiosInstance}