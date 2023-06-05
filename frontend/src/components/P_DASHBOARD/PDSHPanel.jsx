import React, { useEffect, useState } from 'react';

import { PDSHPanelTemplate } from './PDSHPanelTemplate';
import { Groups } from './Groups';
import { Progress } from './Progress';

import '../../styles/professor_dashboard/mainPanel.css';


export const PDSHPanel = ({
  index,
  professorId,
  canReturn,
  changeViewFunction,
  currentComponent,
  setCurrentView,
  setCanReturn,
  setChangeViewFunction,
  setComponentViews,
}) => {
  const [componentTitle, setComponentTitle] = useState('Grupos');

  const components = [
    <Groups
      professorId={professorId}
      setComponentViews={setComponentViews}
      setCurrentView={setCurrentView}
      setCanReturn={setCanReturn}
      setChangeViewFunction={setChangeViewFunction}
      currentComponent={currentComponent}
      setComponentTitle={setComponentTitle}
    />,
    <Progress
      professorId={professorId}
      setComponentViews={setComponentViews}
      setCurrentView={setCurrentView}
      setCanReturn={setCanReturn}
      setChangeViewFunction={setChangeViewFunction}
      currentComponent={currentComponent}
      setComponentTitle={setComponentTitle}
    />,
  ];

  return (
    <div className="p-dash-panel">
      <div className="p-dash-panel-main">
        <PDSHPanelTemplate
          title={componentTitle}
          canReturn={canReturn}
          changeFunction={changeViewFunction}
        />
        {components[index]}
      </div>
    </div>
  );
};
