import axios from "axios";

export const getPath = async (materia_id) => {
  try {
    const options = {
      method: "get",
      url: `http://localhost:3000/path/materia/${materia_id}`,
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