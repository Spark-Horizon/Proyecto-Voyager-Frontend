import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";
import { useGetPendingTask } from '../../hooks/useGetStudentTask';

export const PendingQuizzes = () => {
  
  // Links y componentes de Navbar
  const links = [
    { text: 'Lenguajes', url: '/' },
    { text: 'Contáctanos', url: '/' },
  ];
  const components = [
    { component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'} /></Link> },
    { component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'} /></Link> },
    //{ component: <Link to='/pendingquizzes'><CustomButton type='btn btn-sm btnPrimary' text={'Quizzes pendientes'} /></Link> }
  ];

  const [dataPending, setDataPending] = useState(['']);

  const { data_pending } = useGetPendingTask('A01732005');

  useEffect(() => {
    setDataPending(data_pending);
  }, [data_pending]);

  return (
    <section id='activitiesPage' style={{ minHeight: '100vh' }}>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Quizzes pendientes</h1>
          {dataPending === null ? (
            <p>No hay quizzes pendientes</p>
          ) : (
            <div className="card-container">
              {dataPending.map((homework) => (
                <div className="card bg-light mb-3" key={homework.id}>
                  <div className="card-body">
                  <div className="top-section">
                    <h5 className="card-title text-dark text-start">{homework.titulo}</h5>
                    <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.materia+"-"+homework.grupo}</p>
                  </div>
                  <div className="bottom-section text-end">
                    <p className="card-text text-dark"><strong>Fecha:</strong> {homework.inicio}</p>
                    <p className="card-text text-dark"><strong>Hora límite:</strong> {homework.fin}</p>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
