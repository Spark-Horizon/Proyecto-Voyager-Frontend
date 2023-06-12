import { useState, useEffect } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL
const port = process.env.REACT_APP_BACKEND_PORT

export const useFetchQuizStudent = (id_activity) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = `http://${backendUrl}:${port}/quizPage/${id_activity}`

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchQuiz();
  }, [id_activity]);

  return { data, isLoading, error };
}
