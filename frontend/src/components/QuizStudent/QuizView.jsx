import React, { useState, useEffect } from 'react';
import { useFetchQuizStudent } from '../../hooks/QuizStudent/useFetchQuizStudent';
import { getTask } from '../../helpers/indexHelpers';
import { CompilerPage } from './CompilerPage';
import { MultipleOptionPage } from './MultipleOptionPage';
import { submitRespuesta } from '../../helpers/quizStudent/submitRespuesta';
import { submitIntento } from '../../helpers/quizStudent/submitIntento';
import { Navigate } from 'react-router-dom';

export const QuizView = () => {
  const [compilerData, setCompilerData] = useState();
  const [dataIndex, setDataIndex] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataReady, setIsDataReady] = useState(false);
  const navigate = Navigate()

  const { data, isLoading: quizIsLoading, error } = useFetchQuizStudent(19);

  useEffect(() => {
    const fetchData = async () => {
      if (data?.[dataIndex]?.id) {
        try {
          setIsLoading(true);
          const archivo = await getTask(data[dataIndex].id);
          console.log("Ejercicio:", archivo);
          setTaskData(archivo);
          setCompilerData(archivo);
          setIsLoading(false);
          setIsDataReady(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [data, dataIndex]);

  const submitFunc = (respuesta) => {
    console.log('El id de la respuesta enviada es:', data?.[dataIndex]?.id_respuesta);
    submitRespuesta(data?.[dataIndex]?.id_respuesta, respuesta);
  };

  const handleFinish = () => {
    submitIntento(19)
    navigate('/home');
  };

  const handleNextQuestion = () => {
    if (dataIndex < data.length - 1) {
      setDataIndex(dataIndex + 1);
    } else {
      handleFinish();
    }
  };

  const dataComponent = () => {
    switch (data?.[dataIndex]?.tipo) {
      case 'Código':
        return (
          <CompilerPage
            data={compilerData}
            submitFunc={submitFunc}
            handleNextQuestion={handleNextQuestion}
          />
        );
      case 'Opción múltiple':
        return (
          <MultipleOptionPage
            data={taskData}
            submitFunc={submitFunc}
            handleNextQuestion={handleNextQuestion}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!isLoading && !quizIsLoading && isDataReady ? (
        dataComponent()
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );
};
