import React from 'react';
import { useEffect, useState } from 'react';

import { useDashboardView } from '../../hooks/useDashboardView';

import { ProgressGroups } from './PROGRESS/ProgressGroups';
import { Students } from './PROGRESS/STUDENT/Students';

import '../../styles/professor_dashboard/progress.css';

export const Progress = ({ professorId }) => {
    const [groupId, setGroupId] = useState(null);
  
    const { setters, currentComponent } = useDashboardView();
    const { setCurrentView, setComponentViews } = setters;
  
    useEffect(() => {
      setCurrentView(0);
    }, []);
  
    useEffect(() => {
      setComponentViews([
        <ProgressGroups
          professorId={professorId}
          setGroupId={setGroupId}
          changeParentView={setCurrentView}
        />,
       groupId && (<Students
          groupId={groupId}
          changeParentView={setCurrentView}
        />)
      ]);
    }, [groupId]);
  
    return currentComponent;
};
  
  
