import { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const useSubmitIntento = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `http://${backendUrl}:${port}/quizStudent/${intento}`

  const submitIntento = async (id_intento) => {
    setLoading(true);
    try {
      const res = await axios.post(url, { id_intento });
      return res.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitIntento };
};
