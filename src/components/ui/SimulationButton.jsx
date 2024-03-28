import React from "react";

const SimulationButton = ({ onButtonClick, children, classNames }) => {
  return (
    <button
      className={`simulation-button ` + classNames}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

export default SimulationButton;
