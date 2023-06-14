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
  console.log('Esta es la data: ', data);

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

  const submitFunc = (respuesta) => {
    console.log('El id de la respuesta enviada es:', data[currentIndex].id_respuesta);
    submitRespuesta(data[currentIndex].id_respuesta, respuesta)
  };

  const handleFinish = () => {
    navigate('/home');
  };

  const handleNextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <div>
      <p>Ejercicio {currentIndex + 1} de {data.length}</p>

      {data && data[currentIndex] && (data[currentIndex].tipo === "Código" ? 
        <CompilerPage id={id_ejercicio} /> : 
        data[currentIndex].tipo === "Opción múltiple" ? 
        <MultipleOptionPage 
          data={taskData} 
          submitFunc={submitFunc}
          handleNextQuestion={handleNextQuestion}
        /> : 
      null)}

      {currentIndex === data.length - 1 && (
        <button onClick={handleFinish}>Terminar y volver al inicio</button>
      )}
    </div>
  );
}