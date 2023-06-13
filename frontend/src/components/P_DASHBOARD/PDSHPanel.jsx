import React, { useEffect } from 'react';

import { Groups } from './Groups';
import { Progress } from './Progress';
import { Groups as GroupsCreation } from '../Groups/Groups';

import { useDashboardView } from '../../hooks/useDashboardView';

import '../../styles/professor_dashboard/mainPanel.css';

export const PDSHPanel = ({index, professorId}) => {
  const { setters, currentComponent } = useDashboardView();
  const { setCurrentView, setComponentViews } = setters;

  useEffect(() => {
    setComponentViews([
      <Groups
        professorId={professorId}
      />,
      <Progress
        professorId={professorId}
      />,
      <GroupsCreation />
    ]);
  }, [])

  useEffect(() => {
    setCurrentView(index)
  }, [index])

  return (
    <div className="p-dash-panel">
      <div className="p-dash-panel-main">
        {currentComponent}
      </div>
    </div>
  );
};
