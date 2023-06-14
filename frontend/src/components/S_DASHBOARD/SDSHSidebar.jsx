import React, { useState } from 'react';
import '../../styles/professor_dashboard/sidebar.css';

export const SDSHidebar = ({ changeComponent }) => {
  const [selected, setSelected] = useState(0);
  const options = ['Grupos', 'Quizzes pendientes', 'Resumen de resultados'];

  const handleOnClick = (index) => {
    if (index !== selected) {
      changeComponent(index);
      setSelected(index);
    }
  };

  return (
    <div className="p-dash-sidebar">
      {options.map((opt, i) => (
        <div
          className={`p-dash-sidebar-item ${selected === i ? 'p-dash-sidebar-item-selected' : ''}`}
          onClick={() => handleOnClick(i)}
          key={i}
        >
          {opt}
        </div>
      ))}
    </div>
  );
};
