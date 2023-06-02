import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const getActivitiesTask = async (id, order, hier) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/teacher/activities/${id}/${order}/${hier}`,
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

export const getActivityTask = async (id) => {
  try {
    const options = {
      method: "get",
      url: `http://${backendUrl}:${port}/teacher/activity/${id}`,
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

export const getActivityExercises = async (id) => {
    try {
      const options = {
        method: "get",
        url: `http://${backendUrl}:${port}/teacher/activity/${id}/exercises`,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios(options);
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getDeleteActivity = async (id) => {
  try {
    const options = {
      method: "delete",
      url: `http://${backendUrl}:${port}/teacher/activity/${id}/delete`,
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

export const getCreateActivity = async (titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios) => {
  try {

    const options = {
      method: "post",
      url: `http://${backendUrl}:${port}/teacher/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        titulo: titulo, 
        inicio: inicio, 
        fin: fin, 
        intentos: intentos, 
        bloqueo: bloqueo, 
        disponible: disponible, 
        visible: visible, 
        id_grupo: id_grupo, 
        ejercicios: ejercicios,
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUpdateActivity = async (id, titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios) => {
  try {

    const options = {
      method: "put",
      url: `http://${backendUrl}:${port}/teacher/update`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: id,
        titulo: titulo, 
        inicio: inicio, 
        fin: fin, 
        intentos: intentos, 
        bloqueo: bloqueo, 
        disponible: disponible, 
        visible: visible, 
        id_grupo: id_grupo, 
        ejercicios: ejercicios,
      },
    };

    const response = await axios(options);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};