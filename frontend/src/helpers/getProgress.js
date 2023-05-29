import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT
const user_id = "A01732008"

export const getProgress = async (subtema_id, task_type) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/path/progress/${user_id}/${subtema_id}/${task_type}`,
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