import React, { useState } from 'react';

export const UserDropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen)
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Dropdown Button
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li><a href="/">Option 1</a></li>
          <li><a href="/">Option 2</a></li>
          <li><a href="/">Option 3</a></li>
        </ul>
      )}
    </div>
  );
}
