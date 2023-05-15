import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getTask = async (problem_id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:3000/compiler/problem/${problem_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    const { archivo } = response.data;
    console.log('webazos', archivo);

    return archivo;
  } catch (error) {
    throw error;
  }
};