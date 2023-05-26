import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";

export const PendingQuizzes = () => {
  const pendingHomework = [
    { id: 1, quiz: 'Progra ', group: 'TC1028', date: '18 de mayo de 2023', hour: '10:00 AM' },
    { id: 2, quiz: 'Juegos ', group: 'TC1028', date: '19 de mayo de 2023', hour: '2:00 PM' },
    { id: 3, quiz: 'agentes', group: 'TC1028', date: '20 de mayo de 2023', hour: '9:30 AM' }
  ];

  return (
    <section id='activitiesPage' style={{ minHeight: '100vh' }}>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Quizzes pendientes</h1>
          {pendingHomework.length === 0 ? (
            <p>No hay quizzes pendientes</p>
          ) : (
            <div className="card-container">
              {pendingHomework.map(homework => (
                <div className="card bg-light mb-3" key={homework.id}>
                  <div className="card-body">
                  <div className="top-section">
                    <h5 className="card-title text-dark text-start">{homework.quiz}</h5>
                    <p className="card-text text-dark text-start"><strong>Grupo:</strong> {homework.group}</p>
                  </div>
                  <div className="bottom-section text-end">
                    <p className="card-text text-dark"><strong>Fecha:</strong> {homework.date}</p>
                    <p className="card-text text-dark"><strong>Hora límite:</strong> {homework.hour}</p>
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
