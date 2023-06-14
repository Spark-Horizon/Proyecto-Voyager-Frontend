import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchQuizStudent } from "../../hooks/QuizStudent/useFetchQuizStudent";
import { CompilerPage } from './CompilerPage';
import { MultipleOptionPage } from './MultipleOptionPage';
import { useGetTask } from '../../hooks/useGetTask';
import { useGetIntento } from '../../hooks/QuizStudent/useGetIntento';
import { useAuth } from '../../hooks/AuthContext';
import { submitRespuesta } from '../../helpers/quizStudent/submitRespuesta';

export const QuizPage = () => {
  const { user } = useAuth();
  const user_id = user.id;
  const { id_activity } = useParams();
  const { intento } = useGetIntento(user_id, id_activity)
  const { data, isLoading, error } = useFetchQuizStudent(id_activity);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(data);

  const [id_ejercicio, setIDEjercicio] = useState(null)
  const { data: taskData } = useGetTask(id_ejercicio)

  useEffect(() => {
    if (data && data.length > 0 && data[currentIndex] && data[currentIndex].id) {
      const new_id = data[currentIndex].id
      setIDEjercicio(new_id)
    }
  }, [data, currentIndex])

  const navigate = useNavigate();

  if (isLoading || !taskData || id_ejercicio === null || !intento || !user) {
    console.log(isLoading, taskData, id_ejercicio);
    return <p>Loading de quizPage...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const submitFunc = (respuesta) => {
    submitRespuesta(data.id_respuesta[currentIndex], respuesta)
  };

  const handleFinish = () => {
    navigate('/home');
  };

  // Calcula el número total de preguntas
  const totalQuestions = data ? data.length : 0;

  return (
    <div>
      {/* ... (resto del código) ... */}

      {data && data[currentIndex] && (data[currentIndex].tipo === "Código" ?
        <CompilerPage id={id_ejercicio} /> :
        data[currentIndex].tipo === "Opción múltiple" ?
          <MultipleOptionPage
            data={taskData}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            totalQuestions={totalQuestions} // Pasamos el total de preguntas
            submitFunc={submitFunc}
            handleFinish={handleFinish}
          /> :
          null)}

      {currentIndex === data.length - 1 && (
        <button onClick={handleFinish}>Terminar y volver al inicio</button>
      )}
    </div>
  );

}
