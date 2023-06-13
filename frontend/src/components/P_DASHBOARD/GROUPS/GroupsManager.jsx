import { React, useState } from 'react';

import { TeacherActivity } from '../../teacher/TeacherActivity';
import { Groups } from '../../Groups/Groups';

export const GroupsManager = ({professorId}) => {
    const [currentView, setCurrentView] = useState(0);
    const [groupId, setGroupId] = useState(null);

    const componentViews = [
        <Groups 
            setGroupId={setGroupId}
            changeParentView={setCurrentView}
        />,
        <TeacherActivity 
            professorId={professorId}
            groupId={groupId}
        />
    ];

    const currentComponent = componentViews[currentView];

    return currentComponent;
}
