import React, { useState, useEffect } from 'react'

import { PendingQuizzes } from '../student/PendingQuizzes';
import { SummaryResults } from '../student/SummaryResults';
import { Groups } from '../Groups/Groups';

import '../../styles/professor_dashboard/mainPanel.css';


export const SDSHPanel = ({index}) => {
    const [currentView, setCurrentView] = useState(0);

    const componentViews = [
        <Groups />,
        <PendingQuizzes />,
        <SummaryResults />
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
}
