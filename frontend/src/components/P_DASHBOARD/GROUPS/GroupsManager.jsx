import { React, useState } from 'react';

import { TeacherActivity } from '../../teacher/TeacherActivity';
import { Groups } from '../../Groups/Groups';

export const GroupsManager = ({professorId}) => {
    const [currentView, setCurrentView] = useState(0);
    const [groupId, setGroupId] = useState(null);

    console.log('Current index: ', currentView)

    const componentViews = [
        <Groups 
            setGroupId={setGroupId}
            changeParentView={setCurrentView}
        />,
        <TeacherActivity 
            id={professorId}
            grupo={groupId}
            changeParentView={setCurrentView}
        />
    ];

    const currentComponent = componentViews[currentView];

    return currentComponent;
}
