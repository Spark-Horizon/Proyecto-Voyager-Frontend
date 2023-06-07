import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getPractica = async (subtema_id, task_type, user_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/practica/getorset/${user_id}/${subtema_id}/${task_type}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    const path = response.data;

    return path;
  } catch (error) {
    throw error;
  }
};