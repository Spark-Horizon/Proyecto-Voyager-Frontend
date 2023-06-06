import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT
const user_id = "A01732008"

export const getUnlocked = async (materia_id) => {
    try {
      const options = {
        method: "get",
        url: `http://${backendUrl}:${port}/path/unlocked/${user_id}/${materia_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios(options);
      const unlocked = response.data;
  
      return unlocked;
    } catch (error) {
      throw error;
    }
  };