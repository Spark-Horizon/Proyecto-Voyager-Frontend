import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;


const API_URL = `http://${backendUrl}:${port}/groups`;

//Function to get all groups of a teacher
export const getGroups = async (role, id_docente) => {
    try{
        const res = await axios.get(`${API_URL}/${role}/${id_docente}`);
        return res.data;
    }catch (error){
        console.error(error);
        return [];
    }
};

//Function to create a group
export const createGroup = async (groupData) => {
    try{
        const res = await axios.post(`${API_URL}`, groupData);
        return res.data;
    }catch (error){
        console.error(error);
        return null;
    }
};

//Function to delete a group
export const deleteGroup = async (role, id) => {
    try{
        const res = await axios.delete(`${API_URL}/${role}/${id}`);
    }catch (error){
        console.error(error);
        return null;
    }
};