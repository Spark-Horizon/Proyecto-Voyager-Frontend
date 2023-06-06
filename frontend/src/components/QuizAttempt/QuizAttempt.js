import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchQuizData } from '../../hooks/QuizAttempt/useFetchQuizData';
import { AttemptCard } from './AttemptCard';
import { ActivityCard } from './ActivityCard';
import { useAuth } from '../../hooks/AuthContext';
import { CustomButton } from '../CustomButton';

import '../../styles/QuizAttempt/QuizAttempt.css';

export const QuizAttempt = ({ act, handleBack }) => { // Recibe act como prop
  const { user } = useAuth();
  const { id:id_student } = user;
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizData(id_student, act.id); // Usa act.id en lugar de id_activity
        setQuizData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id_student, act]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!quizData) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="quiz-container">
      <CustomButton text={'regresar'} type={'btn btnSecondary'} func={handleBack} />
      <ActivityCard activity={quizData.activity} />
      {quizData.attempts.map((attempt, index) => (
        <AttemptCard key={attempt.id_intento} eventKey={index} attempt={attempt} />
      ))}
    </Container>
  );
  
};
