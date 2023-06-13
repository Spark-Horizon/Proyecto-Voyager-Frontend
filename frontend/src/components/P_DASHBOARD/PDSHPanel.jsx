import React, { useEffect, useState } from 'react';

import { GroupsManager } from './GROUPS/GroupsManager';
import { Progress } from './Progress';

import '../../styles/professor_dashboard/mainPanel.css';


export const PDSHPanel = ({ index, professorId }) => {
  const [currentView, setCurrentView] = useState(0);

  const componentViews = [
    <GroupsManager 
      professorId={professorId}
    />,
    <Progress
      professorId={professorId}
    />
  ]

  useEffect(() => {
    setCurrentView(index)
  }, [index])

  const currentComponent = componentViews[currentView];

  return (
    <div className="p-dash-panel">
      <div className="p-dash-panel-main">
        {currentComponent}
      </div>
    </div>
  );
};
