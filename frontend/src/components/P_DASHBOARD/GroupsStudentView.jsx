import { useEffect } from "react";

export const GroupsStudentView = ({setCurrentView, changeViewFunction, setCanReturn}) => {
    const returnToPreviousView = () => {
        changeViewFunction(null);
        setCurrentView('table');
        setCanReturn(false);
    }

    useEffect(() => {
        setCanReturn(true);
        changeViewFunction(() => returnToPreviousView);
    }, [])

    return (
        <div>GroupsStudentView</div>
    )
}
