import React, { useState } from 'react';
import '../../styles/professor_dashboard/sidebar.css';

export const PDSHSidebar = ({ changeComponent }) => {
  const [selected, setSelected] = useState(0);
  const options = ['Grupos', 'Revisión de avances'];

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
