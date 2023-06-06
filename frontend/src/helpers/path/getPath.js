import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getPath = async (materia_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/path/materia/${materia_id}`,
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