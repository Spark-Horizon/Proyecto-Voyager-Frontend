import axios from "axios";

export const getTask = async (problem_id) => {
  try {
    const options = {
      method: "get",
      url: `http://localhost:3001/compiler/problem/${problem_id}`,
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