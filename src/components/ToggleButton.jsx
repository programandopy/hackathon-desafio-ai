import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const ToggleButton = ({ handleToggleSidebar, arrowClic }) => {
  return (
    <button
      onClick={handleToggleSidebar}
      className="toggle_sidebar"
      style={{
        left: arrowClic ? '540px' : '0', // Ajusta la posición según el estado arrowClic
        transform: arrowClic ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      {arrowClic ? <IoIosArrowBack /> : <IoIosArrowForward />}
    </button>
  );
};

export default ToggleButton;
