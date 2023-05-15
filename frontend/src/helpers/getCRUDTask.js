import axios from "axios";

export const getCRUDTask = async (fil1, fil2, fil3, fil4, fil5, order, hier) => {
  try {
    const options = {
      method: "get",
      url: `http://localhost:3000/CRUD/${fil1}/${fil2}/${fil3}/${fil4}/${fil5}/${order}/${hier}`,
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
      url: `http://localhost:3000/CRUD/filter/autor`,
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
      url: `http://localhost:3000/CRUD/filter/subtema`,
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
      url: `http://localhost:3000/CRUD/filter/tipo`,
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
      url: `http://localhost:3000/CRUD/filter/dificultad`,
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
      url: `http://localhost:3000/CRUD/filter/autorizacion`,
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

export const getDeleteExcercise = async (id) => {
  try {
    const options = {
      method: "get",
      url: `http://localhost:3000/CRUD/delete/${id}`,
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