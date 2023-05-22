import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";

export const PendingQuizzes = () => {
  const pendingHomework = [
    { id: 1, activity: 'Progra zzz', group: 'TC1028', date: '18 de mayo de 2023', hour: '10:00 AM' },
    { id: 2, activity: 'Juegos GOD', group: 'TC1028', date: '19 de mayo de 2023', hour: '2:00 PM' },
    { id: 3, activity: 'Orgasmiagentes', group: 'TC1028', date: '20 de mayo de 2023', hour: '9:30 AM' }
  ];

  // Links y componentes de Navbar
  const links = [
    { text: 'Lenguajes', url: '/' },
    { text: 'Contáctanos', url: '/' },
  ];
  const components = [
    { component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'} /></Link> },
    { component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'} /></Link> },
    { component: <Link to='/pendingquizzes'><CustomButton type='btn btn-sm btnPrimary' text={'Quizzes pendientes'} /></Link> }
  ];

  return (
    // Trae el estilo de landing, probablemente sea buena idea recrearlo en otro css.
    <section id='landingPage'>
      <div className="container d-flex justify-content-center align-items-center vh-100">
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
                      <h5 className="card-title text-dark text-start">{homework.activity}</h5>
                      <p className="card-text text-dark text-start">{homework.group}</p>
                    </div>
                    <div className="bottom-section text-end">
                      <p className="card-text text-dark">{homework.date}</p>
                      <p className="card-text text-dark">{homework.hour}</p>
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
