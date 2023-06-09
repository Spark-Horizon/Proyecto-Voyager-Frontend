import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetPendingTask } from '../../hooks/useGetStudentTask';

import '../../styles/activitiesStyles.css';

export const PendingQuizzes = () => {

  const [dataPending, setDataPending] = useState(['']);

  const { data_pending } = useGetPendingTask('A01732005');

  useEffect(() => {
    setDataPending(data_pending);
  }, [data_pending]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  };

  return (
    <section id='activitiesPage' style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="text-center">
          <h2 className="mt-5 mb-4">Quizzes pendientes</h2>
          {dataPending === null ? (
            <p>No hay quizzes pendientes</p>
          ) : (
            <div className="card-container-wrapper">
              <div className="card-container">
                {dataPending.map((homework) => (
                  <div className="card bg-light mb-3" key={homework.id}>
                    <div className="card-body">
                      <div className="top-section">
                        <Link to={`/quizAttempt/${homework.id}`} className="card-title text-dark text-start">
                          {homework.titulo}
                        </Link>
                        <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.materia + "-" + homework.grupo}</p>
                      </div>
                      <div className="bottom-section text-end mt-5">
                        <p className="card-text text-dark"><strong>Fecha límite:</strong> {formatDate(homework.fin)}</p>
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
