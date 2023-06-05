import React, { useEffect } from "react";

export const GroupsGeneralView = ({
        setCurrentView,
        changeViewFunction,
        setCanReturn,
        setComponentTitle
    }) => {
    const handleReturnToPreviousView = () => {
        changeViewFunction(null);
        setCurrentView(0);
        setCanReturn(false);
    };

    useEffect(() => {
        setComponentTitle('Vista general');
        setCanReturn(true);
        changeViewFunction(() => handleReturnToPreviousView);
    }, []);

    return (
        <div>
            GroupsGeneralView
        </div>
    );
};
