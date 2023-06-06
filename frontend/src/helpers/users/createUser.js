import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;
const API_URL = `http://${backendUrl}:${port}/users`;

export const createUser = async(userData) => {
    try{
        const res = await axios.post(API_URL, userData);
        return res.data;
    }catch (error){
        console.error(error);
        return null;
    }
}