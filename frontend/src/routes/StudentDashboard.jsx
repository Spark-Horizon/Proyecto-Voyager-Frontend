import React, { useState } from 'react'

import { PDSHSidebar } from '../components/P_DASHBOARD/PDSHSidebar';
import { SDSHPanel } from '../components/S_DASHBOARD/SDSHPanel';
import { SDSHidebar } from '../components/S_DASHBOARD/SDSHSidebar';
import { useAuth } from '../hooks/AuthContext';


export const StudentDashboard = () => {
    const [panelComponent, setPanelComponent] = useState(0);
    const { user } = useAuth();
    const professorId = user.id;

    return (
        <div className='main-background'>
            <div className='main-professor-dashboard'>
                <div className="p-dash-main-container">
                    <SDSHidebar changeComponent={setPanelComponent} />
                    <SDSHPanel index={panelComponent} />
                </div>
            </div>
        </div>
    )
}
