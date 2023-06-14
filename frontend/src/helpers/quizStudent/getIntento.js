import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getIntento = async (user_id, id_activity) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/quizStudent/getorset/${user_id}/${id_activity}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    const intento = response.data;

    return intento;
  } catch (error) {
    throw error;
  }
};