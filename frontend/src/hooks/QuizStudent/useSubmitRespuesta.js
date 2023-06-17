import { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const useSubmitRespuesta = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `http://${backendUrl}:${port}/quizStudent/submitRespuesta`;

  const submitRespuesta = async (id_respuesta, answer_JSON) => {
    setLoading(true);
    try {
      const res = await axios.post(url, { id_respuesta, answer_JSON });
      return res.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitRespuesta };
};
