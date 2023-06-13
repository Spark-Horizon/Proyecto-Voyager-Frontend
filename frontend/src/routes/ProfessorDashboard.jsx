import React from 'react'

import { useState } from 'react';
import { PDSHPanel } from '../components/P_DASHBOARD/PDSHPanel';
import { PDSHSidebar } from '../components/P_DASHBOARD/PDSHSidebar';
import { useAuth } from '../hooks/AuthContext';

export const ProfessorDashboard = () => {
  const [panelComponent, setPanelComponent] = useState(0);
  const { user } = useAuth();
  const professorId = user.id;
  
  return (
    <div className='main-background'>
        <div className='main-professor-dashboard'>
            <div className='main-professor-dash-header'>
              <h1 className='main-header'>Dashboard de Profesor</h1>
            </div>
            <div className="p-dash-main-container">
              <PDSHSidebar changeComponent={setPanelComponent} />
              <PDSHPanel 
                index={panelComponent} 
                professorId={professorId} 
              />
            </div>
        </div>
    </div>
  )
}
