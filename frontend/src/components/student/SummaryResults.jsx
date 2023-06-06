import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetActSummaryTask } from '../../hooks/useGetStudentTask';

import '../../styles/activitiesStyles.css';

export const SummaryResults = () => {

  const [dataSummary, setDataSummary] = useState(['']);

  const { data_summary } = useGetActSummaryTask('A01732005');

  useEffect(() => {
    setDataSummary(data_summary);
  }, [data_summary]);

  return (
    <section id='activitiesPage' style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Resumen de resultados</h1>
          {dataSummary === null ? (
            <p>No hay registro de intentos o de tareas completadas</p>
          ) : (
            <div className="card-container-wrapper">
              <div className="card-container">
                {dataSummary.map((homework) => (
                  <div className="card bg-light mb-3" key={homework.id}>
                    <div className="card-body">
                      <div className="top-section">
                        <Link to={`/quizAttempt/${homework.id}`} className="card-title text-dark text-start">
                          {homework.titulo}
                        </Link>
                        <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.materia+"-"+homework.grupo}</p>
                      </div>
                      <div className="bottom-section text-end">
                        <p className="card-text text-dark"><strong>Calificación:</strong> {homework.correctas+"/"+homework.total}</p>
                        <p className="card-text text-dark"><strong>Intentos:</strong> {homework.intentos+(parseInt(homework.limite) > 0 ? "/"+homework.limite : "")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
