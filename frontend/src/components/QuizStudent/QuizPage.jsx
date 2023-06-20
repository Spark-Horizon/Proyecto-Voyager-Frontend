import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompilerPage } from './CompilerPage';
import { MultipleOptionPage } from './MultipleOptionPage';
import { useAuth } from '../../hooks/AuthContext';
import { useGetOrSet } from '../../hooks/QuizStudent/useGetOrSet';
import { useParams } from 'react-router-dom';
import { useSubmitRespuesta } from '../../hooks/QuizStudent/useSubmitRespuesta';
import { useSubmitIntento } from '../../hooks/QuizStudent/useSubmitIntento';

export const QuizPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const matricula = user.id;
  const { id_activity: quiz } = useParams()

  const { loading, error, data } = useGetOrSet(matricula, quiz);
  const { loading: submitLoading, error: submitError, submitRespuesta } = useSubmitRespuesta();
  const { loading: finishLoading, error: finishError, submitIntento } = useSubmitIntento();

  const [currentExercise, setCurrentExercise] = useState(0);
  const [id_intento, setIdIntento] = useState(null);


  const handleSubmitRespuesta = (id_respuesta, answer_JSON) => {
    submitRespuesta(id_respuesta, answer_JSON)
  }

  const handleNext = () => {
    // Incrementar el índice del ejercicio actual para pasar al siguiente ejercicio, solo si no estamos en el último ejercicio
    if (currentExercise < data.respuestas.length - 1 && !submitError && !submitLoading) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const handleSubmitIntento = () => {
    submitIntento(id_intento)
    navigate('/home');
  }

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setIdIntento(data.intento)
      }
    }
  }, [loading, error, data]);

  return (
    <div>
      {data ?
        <div>
          {(data.respuestas.length === 0 || currentExercise === data.respuestas.length - 1) &&
            <button
              onClick={handleSubmitIntento}
              style={{
                display: 'block',
                width: currentExercise === data.respuestas.length - 1 ? '100%' : '200px', // Ancho completo si es el último ejercicio
                height: '50px',
                margin: '20px auto',
                fontSize: '18px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                webkitBackdropFilter: 'blur(10px)',
                borderRadius: '5px',
                cursor: 'pointer',
                pointerEvents: 'auto',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '50px',
                position: currentExercise === data.respuestas.length - 1 ? 'fixed' : 'relative', // Fijo si es el último ejercicio
                bottom: '0', // Alineado al final de la pantalla
                left: '0', // Alineado al inicio de la pantalla
                zIndex: '1' // Enfrente de otros elementos
              }}
            >
              Finalizar Quiz
            </button>
          }
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  )
}
