import { useState, useEffect } from 'react';
import { useGetActSummaryTask } from '../../hooks/useGetStudentTask';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../../styles/activitiesStyles.css';
import { QuizAttempt } from '../QuizAttempt/QuizAttempt';
import { PDSHPanelTemplate } from '../P_DASHBOARD/PDSHPanelTemplate';
import { CustomButton } from '../CustomButton';

export const SummaryResults = () => {

  const { user } = useAuth();

  const [dataSummary, setDataSummary] = useState(null);

  const { data_summary } = useGetActSummaryTask(user.id);

  const [currentAttempt, setCurrentAttempt] = useState(null);

  const navigate = useNavigate();

  const optionalItems = [
    <CustomButton text={"Nuevo intento"} type={"btn btnPrimary"} disabled={currentAttempt ? currentAttempt.disponible : true} func={() => navigate(`/quizPage/${currentAttempt.id}`)}/>
  ];

  useEffect(() => {
    setDataSummary(data_summary);
  }, [data_summary]);

  let currentHomework = null;
  if (currentAttempt) {
    currentHomework = dataSummary.find(homework => homework.id === currentAttempt.id);
  }

  return (
    <>
      {currentAttempt ? (
        <PDSHPanelTemplate title={currentAttempt.titulo} canReturn={true} hasCustomReturn={true} customReturn={() => setCurrentAttempt(null)} optionalItems={optionalItems}/>
      ) : (
        <PDSHPanelTemplate title={'Resumen de resultados'} />
      )}
      <section id='activitiesPage'>
        <div className="container">
          <div className="text-center">
            {dataSummary === null ? (
              <p>No hay registro de intentos o de tareas completadas</p>
            ) : (
              currentAttempt ? (
                <QuizAttempt act={currentHomework}/>
              ) : (
                <div className="card-container-wrapper">
                  <div className="card-container">
                    {dataSummary.map((homework) => (
                      <div className="card bg-light mb-3" key={homework.id} onClick={() => setCurrentAttempt(homework)}>
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
    </>
  );
};
