import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";

export const SummaryResults = () => {
  const pendingHomework = [
    { id: 1, quiz: 'Progra ', group: 'TC1028', grade: '88.00', tries: '3/3' },
    { id: 2, quiz: 'Juegos ', group: 'TC1028', grade: '97.00', tries: '1/3' },
    { id: 3, quiz: 'agentes', group: 'TC1028', grade: '100.00', tries: '2/3' }
  ];

  const links = [
    { text: 'Lenguajes', url: '/' },
    { text: 'Contáctanos', url: '/' },
  ];
  const components = [
    { component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'} /></Link> },
    { component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'} /></Link> },
  ];

  return (
    <section id='activitiesPage' style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Resumen de resultados</h1>
          {pendingHomework.length === 0 ? (
            <p>No hay registro de intentos o de tareas completadas</p>
          ) : (
            <div className="card-container-wrapper">
              <div className="card-container">
                {pendingHomework.map(homework => (
                  <div className="card bg-light mb-3" key={homework.id}>
                    <div className="card-body">
                      <div className="top-section">
                        <h5 className="card-title text-dark text-start">{homework.quiz}</h5>
                        <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.group}</p>
                      </div>
                      <div className="bottom-section text-end">
                        <p className="card-text text-dark"><strong>Calificación:</strong> {homework.grade}</p>
                        <p className="card-text text-dark"><strong>Intentos:</strong> {homework.tries}</p>
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
