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
  const navigate = useNavigate();
  const { id_activity } = useParams();
  console.log(user_id, id_activity);
  const { intento } = useGetIntento(user_id, id_activity)
  const { data, isLoading, error } = useFetchQuizStudent(9);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [id_ejercicio, setIDEjercicio] = useState(null)
  const [tipo, setTipo] = useState(null)

  useEffect(() => {
    if (data != null) {
      console.log("/////////////", data[currentIndex]);
      const new_id = data[currentIndex].id
      const new_tipo = data[currentIndex].tipo
      setIDEjercicio(new_id)
      setTipo(new_tipo)
      console.log("CURRENTINDEX>>>", currentIndex);
    }
  }, [currentIndex])

  if (isLoading || !taskData || !id_ejercicio || !intento || !user || !data || !id_activity) {
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

  const handleRender = () => {
    if (tipo === "Código") {
      return (
        <div>
          <p>Ejercicio {currentIndex + 1} de {data.length}</p>
          <CompilerPage
            data={taskData}
            submitFunc={submitFunc}
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      )
    } else if (tipo === "Opción múltiple") {
      return (
        <div>
          <p>Ejercicio {currentIndex + 1} de {data.length}</p>
          <MultipleOptionPage
            data={taskData}
            submitFunc={submitFunc}
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      )
    }
  }

  return (
    <div>
      {handleRender()}

      {currentIndex === data.length - 1 && (
        <button onClick={handleFinish}>Terminar y volver al inicio</button>
      )}
    </div>
  );
}