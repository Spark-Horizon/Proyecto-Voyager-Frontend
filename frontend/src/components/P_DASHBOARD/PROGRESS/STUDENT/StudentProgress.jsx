import React, { useEffect, useState } from 'react';

import { PDSHPanelTemplate } from '../../PDSHPanelTemplate';

import { ReactComponent as ProgressIcom } from '../../../../assets/svg/icons/bars-progress-solid.svg';
import { ReactComponent as CheckIcon } from '../../../../assets/svg/icons/check-solid.svg';
import { ReactComponent as AngleDownIcon } from '../../../../assets/svg/icons/angle-down-solid.svg';
import { ReactComponent as ClipboardIcon } from '../../../../assets/svg/icons/clipboard-list-solid.svg';

import { useDashboarMultipledData } from '../../../../hooks/useDashboardMultipleData';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const StudentProgress = ({ studentId, studentName, changeParentView }) => {
    const [toggle, setToggle] = useState(false);
    const [toggleIndex, setToggleIndex] = useState(null);
    const { data, axiosError, isLoading, getData } = useDashboarMultipledData();

    const init = () => {
        const totalAttempts = `http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes/intentos_totales?studentId=${studentId}`;
        const averageAnswers = `http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes/promedio_respuestas_correctas?studentId=${studentId}`;
        const overcomedSubtopics = `http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes/subtemas_superados?studentId=${studentId}`;
        const exercisesProgress = `http://${backendUrl}:${port}/dashboard/profesor/avances/estudiantes/progreso_ejercicios?studentId=${studentId}`;

        const urls = [
            totalAttempts,
            averageAnswers,
            overcomedSubtopics,
            exercisesProgress
        ];

        getData(urls);
        console.log('data: ', data)
    };

    useEffect(() => {
        if (studentId !== null) {
            console.log('studentId', studentId);
            init();
        }
    }, [studentId]);

    const handleOnToggle = (index) => {
        if (toggleIndex === index) {
          setToggle(!toggle);
          setToggleIndex(null);
        } else {
          setToggle(true);
          setToggleIndex(index);
        }
      };

    return (
        <>
            <PDSHPanelTemplate
                title={studentName + ' ' + studentId}
                canReturn={true}
                changeParentView={changeParentView}
                previousComponentIndex={0}
            />
            {
                isLoading && axiosError === null
                    ? <div className='loading'><p className='gradient'>CARGANDO</p></div>
                    : axiosError !== null
                        ? <div>{axiosError}</div>
                        : data.length > 0 && (
                            <div className="progress-main-container">
                                <div className="activities">
                                    <p className='sp-header'>Progreso en actividades</p>
                                    <div className="activities-cards-container">
                                        <div className="activitie-card">
                                            <div className="activitie-card-header-container">
                                                <p className='activitie-card-header'>Intentos totales</p>
                                                <ProgressIcom className='activitie-card-icon' />
                                            </div>
                                            <div className="activitie-card-info">
                                                {data[0][0].count}
                                            </div>
                                        </div>
                                        <div className="activitie-card">
                                            <div className="activitie-card-header-container">
                                                <p className='activitie-card-header-large'>Promedio de respuestas correctas por actividad</p>
                                                <CheckIcon className='activitie-card-icon' />
                                            </div>
                                            <div className="activitie-card-info">
                                                {data[1][0].promedio_correctos ? data[1][0].promedio_correctos : 'Sin información por mostrar'}
                                            </div>
                                        </div>
                                        <div className="activitie-card">
                                            <div className="activitie-card-header-container">
                                                <p className='activitie-card-header-large'>Subtemas superados</p>
                                                <ClipboardIcon className='activitie-card-icon' />
                                            </div>
                                            <div className="activitie-card-info">
                                                {data[2][0].subtemas_superados}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="exercises">
                                    <p className="sp-header">Progreso en ejercicios</p>
                                    <div className="exercises-cards-container">
                                        {data[3].map((tema, index) => (
                                            <div className={`exercise-card ${toggleIndex === index ? 'selected' : ''}`} onClick={() => handleOnToggle(index)} key={index}>
                                                <div className="exercise-card-header-container">
                                                    <p className={`exercise-topic-name ${(toggleIndex === index && toggle) ? 'gradient' : ''}`}>{tema.nombre_tema}</p>
                                                    <AngleDownIcon className={`exercise-card-icon ${(toggleIndex === index && toggle) ? 'rotate' : ''}`} onClick={handleOnToggle} />
                                                </div>
                                                <div className={`exercise-card-info ${(toggleIndex === index && toggle) ? 'toggle' : ''}`}>
                                                    {tema.nombres_subtemas.map((nombreSubtema, subIndex) => (
                                                        <div key={subIndex}>
                                                            <div className="subtopic-name-container">
                                                                <p className='subtopic-name'>{nombreSubtema}</p>
                                                                <div className={`${tema.superados[subIndex] ? 'passed' : 'failed'}`}>
                                                                    {tema.superados[subIndex] ? 'Superado' : 'No superado'}
                                                                </div>
                                                            </div>
                                                            <div className="subtopic-info">
                                                                <div className="subtopic-info-card">
                                                                    <p className="subtopic-info-card-header gradient">Racha de opción múltiple</p>
                                                                    <p>{tema.rachas_om[subIndex]}<span className='gradient'>/</span>{tema.rachas_om_requeridos[subIndex]}</p>
                                                                </div>
                                                                <div className="subtopic-info-card">
                                                                    <p className="subtopic-info-card-header gradient">Progeso en ejercicios de opción múltiple</p>
                                                                    <p>{tema.progresos_om[subIndex]}<span className='gradient'>/</span>{tema.requeridos_om[subIndex]}</p>
                                                                </div>
                                                                <div className="subtopic-info-card">
                                                                    <p className="subtopic-info-card-header gradient">Racha de código</p>
                                                                    <p>{tema.rachas_codigo[subIndex]}<span className='gradient'>/</span>{tema.rachas_codigo_requeridos[subIndex]}</p>
                                                                </div>
                                                                <div className="subtopic-info-card">
                                                                    <p className="subtopic-info-card-header gradient">Progeso en ejercicios de código</p>
                                                                    <p>{tema.progresos_codigo[subIndex]}<span className='gradient'>/</span>{tema.requeridos_codigo[subIndex]}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
            }
        </>
    );
};
