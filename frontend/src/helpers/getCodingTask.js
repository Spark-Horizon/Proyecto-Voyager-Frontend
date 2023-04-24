import axios from "axios";

export const getCodeTask = async (problem_id) => {
  try {
    const options = {
      method: "get",
      url: `http://localhost:3000/compiler/problem/${problem_id}`,
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