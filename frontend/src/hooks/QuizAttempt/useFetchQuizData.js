import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

const fetchQuizData = async (id_student, id_activity) => {
    try {
      const response = await axios.get(`http://${backendUrl}:${port}/quizAttempt/${id_student}/${id_activity}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un estado fuera del rango de 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw new Error(`HTTP error! status: ${error.response.status}`);
      } else if (error.request) {
        // La solicitud se realizó, pero no se recibió ninguna respuesta
        console.log(error.request);
        throw new Error('No response from server.');
      } else {
        // Algo sucedió en la configuración de la solicitud que provocó un error
        console.log('Error', error.message);
        throw new Error(error.message);
      }
    }
  };
  

export default fetchQuizData;
