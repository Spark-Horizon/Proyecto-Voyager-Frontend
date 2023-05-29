import React from 'react'
import { useState } from 'react';
import { PDSHPanel } from '../components/P_DASHBOARD/PDSHPanel';
import { PDSHSidebar } from '../components/P_DASHBOARD/PDSHSidebar';

import '../styles/professor_dashboard/professorDashboard.css';

export const ProfessorDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState(0);
  const professorId = 'L01732005';

  return (
    <div className='main-background'>
        <div className='main-professor-dashboard'>
            <div className='main-professor-dash-header'>
              Dashboard de Profesor
            </div>
            <div className="p-dash-main-container">
              <PDSHSidebar changeComponent={setCurrentComponent} />
              <PDSHPanel index={currentComponent} professorId={professorId} />
            </div>
        </div>
    </div>
  )
}
