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

export const getCRUDTaskTeacher = async (fil1, fil2, fil3, fil4, fil5, order, hier, id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/teacher/${fil1}/${fil2}/${fil3}/${fil4}/${fil5}/${order}/${hier}/${id}`,
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

export const getExerciseTask = async (id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/CRUD/exercise/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios(options);

    return response.data[0];
  } catch (error) {
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

export const getCreateCodeExercise = async (autorizado, tipo, subtema, author, title, description, difficulty, driver, tests, id_autor) => {
  try {

    const options = {
      method: "post",
      url: `http://${backendUrl}:${port}/CRUD/create/code`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        autorizado: autorizado,
        tipo: tipo,
        subtema: subtema.split(','),
        author: author,
        title: title,
        description: description,
        difficulty: difficulty,
        driver: driver,
        tests: tests,
        id_autor: id_autor,
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreateOMExercise = async (autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options, id_autor) => {
  try {
    const optionsAx = {
      method: "post",
      url: `http://${backendUrl}:${port}/CRUD/create/om`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        autorizado: autorizado,
        tipo: tipo,
        subtema: subtema.split(','),
        author: author,
        title: title,
        description: description,
        difficulty: difficulty,
        answer: answer,
        hints: hints,
        options: options,
        id_autor: id_autor,
      },
    };

    const response = await axios(optionsAx);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreateRandomExercise = async (tipo, subtema, difficulty, id_autor) => {
  try {
    const optionsAx = {
      method: "post",
      url: `http://${backendUrl}:${port}/CRUD/create/random`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        tipo: tipo,
        subtema: subtema.split(','),
        difficulty: difficulty,
        id_autor: id_autor,
      },
    };

    const response = await axios(optionsAx);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUpdateCodeExercise = async (id, autorizado, tipo, subtema, author, title, description, difficulty, driver, tests) => {
  try {
    const options = {
      method: "put",
      url: `http://${backendUrl}:${port}/CRUD/update/code`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        autorizado: autorizado,
        tipo: tipo,
        subtema: subtema.split(','),
        author: author,
        title: title,
        description: description,
        difficulty: difficulty,
        driver: driver,
        tests: tests,
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUpdateOMExercise = async (id, autorizado, tipo, subtema, author, title, description, difficulty, answer, hints, options) => {

  try {
    const optionsAx = {
      method: "put",
      url: `http://${backendUrl}:${port}/CRUD/update/om`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        autorizado: autorizado,
        tipo: tipo,
        subtema: subtema.split(','),
        author: author,
        title: title,
        description: description,
        difficulty: difficulty,
        answer: answer,
        hints: hints,
        options: options,
      },
    };

    const response = await axios(optionsAx);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUpdateRandomExercise = async (id, tipo, subtema, difficulty) => {
  try {
    const optionsAx = {
      method: "put",
      url: `http://${backendUrl}:${port}/CRUD/update/random`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        tipo: tipo,
        subtema: subtema.split(','),
        difficulty: difficulty,
      },
    };

    const response = await axios(optionsAx);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};