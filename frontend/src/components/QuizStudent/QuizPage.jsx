import React, { useState, useEffect } from 'react';
import { CompilerPage } from './CompilerPage';
import { MultipleOptionPage } from './MultipleOptionPage';
import { useAuth } from '../../hooks/AuthContext';
import { useGetOrSet } from '../../hooks/QuizStudent/useGetOrSet';
import { useParams } from 'react-router-dom';
import { useSubmitRespuesta } from '../../hooks/QuizStudent/useSubmitRespuesta';

export const QuizPage = () => {
  const { user } = useAuth();
  const matricula = user.id;
  const { id_activity:quiz } = useParams()

  const { loading, error, data } = useGetOrSet(matricula, quiz);
  const { loading:submitLoading, error:submitError, submitRespuesta } = useSubmitRespuesta();

  const [renderizedExercises, setRenderizedExercises] = useState(length(data.respuestas.length));
  const [id_respuesta, setIdRespuesta] = useState(null);

  const handleSubmitRespuesta = (answer_JSON) => {
    useSubmitRespuesta(id_respuesta ,answer_JSON)
    if (!submitError && !submitLoading){
      setRenderizedExercises(renderizedExercises - 1);
    }
  }
  


  useEffect(() => {
    if (!loading) {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }
  }, [loading, error, data]);

  return (
    <div>
      {data ? 
        <div>
          {data.respuestas.map((respuesta) => 
            respuesta.tipo === "Código" 
            ? <CompilerPage data={respuesta.ejercicio_archivo} submitFunc={handleSubmitRespuesta} />
            : respuesta.tipo === "Opción múltiple" 
            ? <MultipleOptionPage data={respuesta.ejercicio_archivo} submitFunc={handleSubmitRespuesta} /> 
            : null
          )}
        </div> 
        : 
        <p>Loading...</p>
      }
    </div>
  )
}
