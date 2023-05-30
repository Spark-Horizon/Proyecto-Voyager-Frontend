import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;


const API_URL = `http://${backendUrl}:${port}/groups`;

//Function to get all groups
//Teacher and student can use the same function
export const getGroups = async (role, id) => {
    try{
        const res = await axios.get(`${API_URL}/${role}/${id}`);
        return res.data;
    }catch (error){
        console.error(error);
        return [];
    }
};

//Function to create a group (TEACHER)
export const createGroup = async (groupData) => {
    try{
        const res = await axios.post(`${API_URL}`, groupData);
        return res.data;
    }catch (error){
        console.error(error);
        return null;
    }
};

//Function to enter a group (STUDENT)
export const enterGroup = async (userGroupData) => {
    try{
        const res = await axios.post(`${API_URL}`, userGroupData);
        return res.data;
    }catch (error){
        console.error();
        return null;
    }
};

//Function to delete a group (TEACHER)
export const deleteGroup = async (role, id) => {
    try{
        await axios.delete(`${API_URL}/${role}/${id}`);
    }catch (error){
        console.error(error);
        return null;
    }
};

//Function to exit a group (STUDENT)
export const exitGroup = async (role, id, codigo) => {
    try{
        await axios.delete(`${API_URL}/${role}/${id}/${codigo}`);
    }catch (error){
        console.error(error);
        return null;
    }
};

//Function to get subjects
export const getSubjects = async () => {
    try{
        const res = await axios.get(`${API_URL}/subjects`);
        return res.data;
    }catch (error){
        console.error(error);
        return [];
    }
};