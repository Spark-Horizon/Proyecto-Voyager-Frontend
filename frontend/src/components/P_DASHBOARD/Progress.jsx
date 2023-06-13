import React from 'react';
import { useState } from 'react';

import { ProgressGroups } from './PROGRESS/ProgressGroups';
import { Students } from './PROGRESS/STUDENT/Students';

import '../../styles/professor_dashboard/progress.css';

export const Progress = ({ professorId }) => {
  const [groupId, setGroupId] = useState(null);
  const [currentView, setCurrentView] = useState(0);

  const componentViews = [
    <ProgressGroups
      professorId={professorId}
      setGroupId={setGroupId}
      changeParentView={setCurrentView}
    />,
    <Students
      groupId={groupId}
      changeParentView={setCurrentView}
    />
  ];

  const currentComponent = componentViews[currentView];

  return currentComponent;
};


