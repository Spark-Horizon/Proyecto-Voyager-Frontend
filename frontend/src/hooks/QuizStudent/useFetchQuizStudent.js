import { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const useFetchQuizStudent = (intento) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = `http://${backendUrl}:${port}/quizStudent/${intento}`

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url);

        console.log('RESPONSE DATA', response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchQuiz();
  }, [intento]);

  return { data, isLoading, error };
}
