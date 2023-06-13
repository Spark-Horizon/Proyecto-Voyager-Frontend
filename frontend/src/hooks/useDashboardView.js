import { useState } from "react";

export const useDashboardView = () => {
  const [componentViews, setComponentViews] = useState([]);
  const [currentView, setCurrentView] = useState(0);

  return {
    setters: {
      setCurrentView,
      setComponentViews
    },
    currentComponent: componentViews[currentView]
  };
};
