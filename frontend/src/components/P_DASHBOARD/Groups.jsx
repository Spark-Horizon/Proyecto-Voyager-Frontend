import { useState, useEffect } from 'react';

import { PDSHPanelTemplate } from './PDSHPanelTemplate';

import { GroupsTable } from './GroupsTable';
import { GroupsStudentView } from './GroupsStudentView';
import { GroupsGeneralView } from './GroupsGeneralView';

import '../../styles/professor_dashboard/groups.css';




export const Groups = ({ professorId }) => {
    const [currentView, setCurrentView] = useState('table');
    const [canReturn, setCanReturn] = useState(false);
    const [changeViewFunction, setChangeViewFunction] = useState(null);

    const views = {
        table: <GroupsTable professorId={professorId} changeView={setCurrentView} />,
        generalView: <GroupsGeneralView changeView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} />,
        studentView: <GroupsStudentView changeView={setCurrentView} changeViewFunction={setChangeViewFunction} setCanReturn={setCanReturn} />
    }

    useEffect(() => {
        setCanReturn(false);
        setChangeViewFunction(null);
    }, [])

    return (
        <>
            <PDSHPanelTemplate title={'Grupos'} canReturn={canReturn} changeFunction={changeViewFunction} />       
            <div className="groups-main-container">{views[currentView]}</div>
        </>
    )
}
