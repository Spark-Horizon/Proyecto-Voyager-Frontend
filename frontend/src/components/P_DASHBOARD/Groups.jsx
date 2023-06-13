import { useEffect } from 'react';

import { GroupsStudentView } from './GroupsStudentView';
import { GroupsGeneralView } from './GroupsGeneralView';
import { GroupsTable } from './GROUPS/GroupsTable';

import { useDashboardView } from '../../hooks/useDashboardView';

export const Groups = ({professorId}) => {
    const { setters, currentComponent } = useDashboardView();
    const { setCurrentView, setComponentViews } = setters;

    useEffect(() => {
        setCurrentView(0);
    }, [])
    
    useEffect(() => {
        setComponentViews([
            <GroupsTable 
                professorId={professorId}
                changeParentView={setCurrentView}
            />,
            <GroupsGeneralView 
                changeParentView={setCurrentView}
            />,
            <GroupsStudentView 
                changeParentView={setCurrentView}
            />
        ]);
    }, [])

    return (
        <>
            {currentComponent}
        </>
    )
}
