import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT

export const getTask = async (problem_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/compiler/problem/${problem_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    const { archivo } = response.data;

    return archivo;
  } catch (error) {
    throw error;
  }
};