import React from "react";

const Modal = ({ children }) => {
  return (
    // MODAL CONTAINER
    <div className="absolute bg-opacity-80 bg-stone-900 h-full flex flex-col w-full justify-center">
      {/* MODAL CONTENT */}
      {children}
    </div>
  );
};

export default Modal;
