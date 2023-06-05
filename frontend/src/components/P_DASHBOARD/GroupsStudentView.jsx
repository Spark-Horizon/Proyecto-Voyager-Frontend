import { useEffect } from "react";

export const GroupsStudentView = ({setCurrentView, changeViewFunction, setCanReturn, setComponentTitle}) => {
    const returnToPreviousView = () => {
        changeViewFunction(null);
        setCurrentView(0);
        setCanReturn(false);
    }

    useEffect(() => {
        setComponentTitle('Vista por estudiante')
        setCanReturn(true);
        changeViewFunction(() => returnToPreviousView);
    }, [])

    return (
        <div>GroupsStudentView</div>
    )
}
