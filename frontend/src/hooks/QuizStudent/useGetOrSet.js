import { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const useGetOrSet = (matricula, quiz) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const url = `http://${backendUrl}:${port}/quizStudent/${matricula}/${quiz}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matricula, quiz]);

  return { loading, error, data };
};
