import React, { useState, useEffect } from 'react';
import { CompilerPage } from './CompilerPage';
import { MultipleOptionPage } from './MultipleOptionPage';
import { useAuth } from '../../hooks/AuthContext';
import { useGetOrSet } from '../../hooks/QuizStudent/useGetOrSet';
import { useParams } from 'react-router-dom';

export const QuizPage = () => {
  const { user } = useAuth();
  const matricula = user.id;
  const { id_activity:quiz } = useParams()

  const { loading, error, data } = useGetOrSet(matricula, quiz);

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
            ? <CompilerPage data={respuesta.ejercicio_archivo} />
            : respuesta.tipo === "Opción múltiple" 
            ? <MultipleOptionPage data={respuesta.ejercicio_archivo} /> 
            : null
          )}
        </div> 
        : 
        <p>Loading...</p>
      }
    </div>
  )
}
