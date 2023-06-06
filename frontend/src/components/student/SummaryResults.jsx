import { useState, useEffect } from 'react';
import { useGetActSummaryTask } from '../../hooks/useGetStudentTask';
import { useAuth } from '../../hooks/AuthContext';

import '../../styles/activitiesStyles.css';
import { QuizAttempt } from '../QuizAttempt/QuizAttempt';

export const SummaryResults = () => {

  const { user } = useAuth();

  const [dataSummary, setDataSummary] = useState(null);

  const { data_summary } = useGetActSummaryTask(user.id);

  const [currentAttempt, setCurrentAttempt] = useState(null);

  useEffect(() => {
    setDataSummary(data_summary);
  }, [data_summary]);

  let currentHomework = null;
  if (currentAttempt) {
    currentHomework = dataSummary.find(homework => homework.id === currentAttempt);
  }

  return (
    <section id='activitiesPage' style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Resumen de resultados</h1>
          {dataSummary === null ? (
            <p>No hay registro de intentos o de tareas completadas</p>
          ) : (
            currentAttempt ? (
              <QuizAttempt act={currentHomework}/>
            ) : (
              <div className="card-container-wrapper">
                <div className="card-container">
                  {dataSummary.map((homework) => (
                    <div className="card bg-light mb-3" key={homework.id} onClick={() => setCurrentAttempt(homework.id)}>
                      <div className="card-body">
                        <div className="top-section">
                          {homework.titulo}
                          <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.materia + "-" + homework.grupo}</p>
                        </div>
                        <div className="bottom-section text-end">
                          <p className="card-text text-dark"><strong>Calificación:</strong> {homework.correctas + "/" + homework.total}</p>
                          <p className="card-text text-dark"><strong>Intentos:</strong> {homework.intentos + (parseInt(homework.limite) > 0 ? "/" + homework.limite : "")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
