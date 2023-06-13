import React, { useEffect, useState } from 'react';

import { StudentsTable } from './StudentsTable';
import { StudentProgress } from './StudentProgress';

import { useDashboardView } from '../../../../hooks/useDashboardView';

import '../../../../styles/professor_dashboard/students.css';


export const Students = ({ groupId, changeParentView }) => {
    const [studentId, setStudentId] = useState(null);
    const [studentName, setStudentName] = useState(null);
    const [currentView, setCurrentView] = useState(0);

    const componentViews = [
        <StudentsTable
            groupId={groupId}
            setStudentId={setStudentId}
            setStudentName={setStudentName}
            changeParentView={setCurrentView}
            changeGrandparentView={changeParentView}
        />,
        <StudentProgress
            studentId={studentId}
            studentName={studentName}
            changeParentView={setCurrentView}
        />
    ]

    const currentComponent = componentViews[currentView];

    return <>{currentComponent}</>;
};
