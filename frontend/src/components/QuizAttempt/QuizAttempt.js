import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchQuizData } from '../../hooks/QuizAttempt/useFetchQuizData';
import { formatQuizData } from '../../helpers/QuizAttempt/formatQuizData';
import { AttemptCard } from './AttemptCard';
import { ActivityCard } from './ActivityCard';
import '../../styles/QuizAttempt/QuizAttempt.css';

export const QuizAttempt = ({ user }) => {
  const { id:id_student } = user;
  const { id_activity } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizData(id_student, id_activity);
        // const formattedData = formatQuizData(data);
        setQuizData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id_student, id_activity]);

  if (quizData) {
    // console.log(quizData);
    console.log(quizData.attempts[0].id_intento)
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!quizData) {
    return <p>Loading...</p>;
  }


  // Arreglar esto
  return (
    <Container className="quiz-container">
      <ActivityCard activity={quizData.activity} />
      {quizData.attempts.map((attempt, index) => (
        <AttemptCard key={attempt.id_intento} eventKey={index} attempt={attempt} />
      ))}
    </Container>
  );
  
};
