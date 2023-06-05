import React from 'react';
import { useEffect, useState } from 'react';

import { ProgressGroups } from './PROGRESS/ProgressGroups';
import { Students } from './PROGRESS/STUDENT/Students';

export const Progress = ({ 
    professorId, 
    setComponentViews, 
    setCurrentView, 
    setCanReturn, 
    setChangeViewFunction, 
    currentComponent, 
    setComponentTitle 
}) => {
    const [groupId, setGroupId] = useState('');

    useEffect(() => {
        setComponentViews([
            <ProgressGroups 
                professorId={professorId} 
                setComponentTitle={setComponentTitle} 
                setCurrentView={setCurrentView}
                setGroupId={setGroupId}
            />,
            <Students 
                groupId={groupId}
                setCurrentView={setCurrentView} 
                setChangeViewFunction={setChangeViewFunction} 
                setCanReturn={setCanReturn} 
                setComponentTitle={setComponentTitle} 
            />
        ]);
    }, [groupId]);

    return (
        <div className='progress-main-container'>
            {currentComponent}
        </div>
    );
};
