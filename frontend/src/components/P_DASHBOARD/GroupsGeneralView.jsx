import { useEffect } from "react";

export const GroupsGeneralView = ({setCurrentView, changeViewFunction, setCanReturn}) => {
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
        <div>
            GroupsGeneralView
        </div>
    )
}
