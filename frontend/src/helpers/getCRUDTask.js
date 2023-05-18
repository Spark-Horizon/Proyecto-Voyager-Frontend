import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getCRUDTask = async (fil1, fil2, fil3, fil4, fil5, order, hier) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/${fil1}/${fil2}/${fil3}/${fil4}/${fil5}/${order}/${hier}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilAutorTask = async () => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/filter/autor`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilSubtemaTask = async () => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/filter/subtema`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilTipoTask = async () => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/filter/tipo`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilDificultadTask = async () => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/filter/dificultad`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFilAutorizacionTask = async () => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/filter/autorizacion`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDeleteExercise = async (id) => {
  try {
    const options = {
      method: "delete",
      url: `http://${backendUrl}:${port}/CRUD/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreateCodeExercise = async (autorizado, tipo, subtema, author, title, description, difficulty, driver, tests) => {
  try {
    const options = {
      method: "post",
      url: `http://${backendUrl}:${port}/CRUD/create/${autorizado}/${tipo}/${subtema}/${author}/${title}/${description}/${difficulty}/${driver}/${tests}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreateOMExercise = async (autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, answerOptions) => {
  try {
    const options = {
      method: "post",
      url: `http://${backendUrl}:${port}/CRUD/create/${autorizado}/${tipo}/${subtema}/${author}/${title}/${description}/${difficulty}/${answer}/${hints}/${answerOptions}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};