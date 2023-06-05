import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { PDSHPanel } from '../components/P_DASHBOARD/PDSHPanel';
import { PDSHSidebar } from '../components/P_DASHBOARD/PDSHSidebar';
import { useDashboardView } from '../hooks/useDashboardView';

import '../styles/professor_dashboard/professorDashboard.css';

export const ProfessorDashboard = () => {
  const [panelComponent, setPanelComponent] = useState(0);
  const { canReturn, changeViewFunction, setters, currentComponent } = useDashboardView();
  const { setCurrentView, setCanReturn, setChangeViewFunction, setComponentViews } = setters;
  const professorId = 'L01732011';

  useEffect(() => {
    setCanReturn(false);
  }, [panelComponent])
  
  return (
    <div className='main-background'>
        <div className='main-professor-dashboard'>
            <div className='main-professor-dash-header'>
              Dashboard de Profesor
            </div>
            <div className="p-dash-main-container">
              <PDSHSidebar changeComponent={setPanelComponent} />
              <PDSHPanel 
                index={panelComponent} 
                professorId={professorId} 
                canReturn={canReturn} 
                changeViewFunction={changeViewFunction}
                currentComponent={currentComponent}
                setCurrentView={setCurrentView}
                setCanReturn={setCanReturn}
                setChangeViewFunction={setChangeViewFunction}
                setComponentViews={setComponentViews}  
              />
            </div>
        </div>
    </div>
  )
}
