import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";

export const SummaryResults = () => {
  const pendingHomework = [
    { id: 1, quiz: 'Progra zzz', group: 'TC1028', grade: '88.00', tries: '3/3' },
    { id: 2, quiz: 'Juegos GOD', group: 'TC1028', grade: '97.00', tries: '1/3' },
    { id: 3, quiz: 'Orgasmiagentes', group: 'TC1028', grade: '100.00', tries: '2/3' }
  ];

  // Links y componentes de Navbar
  const links = [
    { text: 'Lenguajes', url: '/' },
    { text: 'Contáctanos', url: '/' },
  ];
  const components = [
    { component: <Link to='/signin'><CustomButton type='btn btn-sm btnPrimary' text={'Iniciar sesión'} /></Link> },
    { component: <Link to='/signup'><CustomButton type='btn btn-sm btnPrimary' text={'Crear cuenta'} /></Link> },
    //{ component: <Link to='/summarypage'><CustomButton type='btn btn-sm btnPrimary' text={'Resumen de resultados'} /></Link> }
  ];

  return (
    // Trae el estilo de landing, probablemente sea buena idea recrearlo en otro css.
    <section id='landingPage'>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Resumen de resultados</h1>
          {pendingHomework.length === 0 ? (
            <p>No hay registro de intentos o de tareas completadas</p>
          ) : (
            <div className="card-container">
              {pendingHomework.map(homework => (
                <div className="card bg-light mb-3" key={homework.id}>
                  <div className="card-body">
                    <div className="top-section">
                      <h5 className="card-title text-dark text-start">{homework.quiz}</h5>
                      <p className="card-text text-dark text-start">Grupo: {homework.group}</p>
                    </div>
                    <div className="bottom-section text-end">
                      <p className="card-text text-dark">Calificación: {homework.grade}</p>
                      <p className="card-text text-dark">Intentos: {homework.tries}</p>
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
