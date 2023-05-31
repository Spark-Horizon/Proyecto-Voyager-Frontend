import { useState, useEffect } from 'react';

import { GroupsTable } from './GroupsTable';
import { GroupsStudentView } from './GroupsStudentView';
import { GroupsGeneralView } from './GroupsGeneralView';

import '../../styles/professor_dashboard/groups.css';


export const Groups = ({ professorId, setComponentViews, setCurrentView, setCanReturn, setChangeViewFunction, currentComponent }) => {
    useEffect(() => {
        setComponentViews(
            {
                table: <GroupsTable professorId={professorId} changeView={setCurrentView} />,
                generalView: <GroupsGeneralView setCurrentView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} />,
                studentView: <GroupsStudentView setCurrentView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} />
            }
        );
        
        setCurrentView('table');
    }, [])

    return (
        <>
            <div className="groups-main-container">{currentComponent}</div>
        </>
    )
}
