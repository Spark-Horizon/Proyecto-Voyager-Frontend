import { useState } from "react";



export const useDashboardView = () => {
    const [componentViews, setComponentViews] = useState(null)
    const [currentView, setCurrentView] = useState(null);
    const [canReturn, setCanReturn] = useState(false);
    const [changeViewFunction, setChangeViewFunction] = useState(null);


    return {
        canReturn,
        changeViewFunction,
        setters: {
            setCurrentView,
            setCanReturn,
            setChangeViewFunction,
            setComponentViews
        },
        currentComponent: currentView !== null ? componentViews[currentView] : null
    }
}
