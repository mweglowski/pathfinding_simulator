import React from "react";

const Notification = ({ text }) => {
  return (
    <div className="env-setup-notification opacity-0">
      <p className="env-setup-notification-text">{text}</p>
    </div>
  );
};

export default Notification;
