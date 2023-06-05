import { useState } from "react";

export const useDashboardView = () => {
  const [componentViews, setComponentViews] = useState([]);
  const [currentView, setCurrentView] = useState(0);
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
    currentComponent: componentViews[currentView]
  };
};
