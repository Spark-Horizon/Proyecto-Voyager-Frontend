import { useEffect } from "react";

export const GroupsGeneralView = ({changeView, changeViewFunction, setCanReturn}) => {
    const returnToPreviousView = () => {
        setCanReturn(false);
        changeViewFunction(null);
        changeView('table');
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
