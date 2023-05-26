import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from "../CustomButton";
import { useGetActSummaryTask } from '../../hooks/useGetStudentTask';

export const SummaryResults = () => {
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

  const [dataSummary, setDataSummary] = useState(['']);

  const { data_summary } = useGetActSummaryTask('A01732005');

  useEffect(() => {
    setDataSummary(data_summary);
  }, [data_summary]);


  return (
    // Trae el estilo de landing, probablemente sea buena idea recrearlo en otro css.
    <section id='landingPage'>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h1 className="mt-5 mb-4">Resumen de resultados</h1>
          {dataSummary === null ? (
            <p>No hay registro de intentos o de tareas completadas</p>
          ) : (
            <div className="card-container">
              {dataSummary.map((homework) => (
                <div className="card bg-light mb-3" key={homework.id}>
                  <div className="card-body">
                    <div className="top-section">
                      <h5 className="card-title text-dark text-start">{homework.titulo}</h5>
                      <p className="card-text text-dark text-start">Grupo: {homework.materia+"-"+homework.grupo}</p>
                    </div>
                    <div className="bottom-section text-end">
                      <p className="card-text text-dark">Calificación: {homework.correctas+"/"+homework.total}</p>
                      <p className="card-text text-dark">Intentos: {homework.intentos}</p>
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
