import { useState, useEffect } from 'react';

import { GroupsStudentView } from './GroupsStudentView';
import { GroupsGeneralView } from './GroupsGeneralView';
import { GroupsTable } from './GROUPS/GroupsTable';

import '../../styles/professor_dashboard/groups.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const Groups = ({ 
    professorId, 
    setComponentViews, 
    setCurrentView, 
    setCanReturn, 
    setChangeViewFunction, 
    currentComponent, 
    setComponentTitle 
}) => {
    const headers = ['ID', 'Código', 'Materia', 'Nombre del curso'];
    const url = `http://${backendUrl}:${port}/dashboard/profesor/entregas?id=${professorId}`;

    useEffect(() => {
        setComponentViews(
            [
                <GroupsTable url={url} headers={headers} changeView={setCurrentView} setComponentTitle={setComponentTitle} />,
                <GroupsGeneralView setCurrentView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} setComponentTitle={setComponentTitle} />,
                <GroupsStudentView setCurrentView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} setComponentTitle={setComponentTitle} />
            ]
        );

        setCurrentView(0);
    }, [])
    

    return (
        <>
            <div className="groups-main-container">
                {
                    currentComponent
                }
            </div>
        </>
    )
}
