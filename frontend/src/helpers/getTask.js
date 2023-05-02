import axios from "axios";

export const getTask = async (problem_id) => {
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

export const getCRUDTask = async (fil1, fil2, fil3, fil4, fil5, order, hier) => {
  console.log(`http://localhost:3001/CRUD/${fil1}/${fil2}/${fil3}/${fil4}/${fil5}/${order}/${hier}`);
  try {
    const options = {
      method: "get",
      url: `http://localhost:3001/CRUD/${fil1}/${fil2}/${fil3}/${fil4}/${fil5}/${order}/${hier}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    const { resultado } = response.data;

    return resultado;
  } catch (error) {
    throw error;
  }
};