import React from "react";

const Notification = ({ text }) => {
  return (
    <div className="env-setup-notification">
      <p className="env-setup-notification-text">{text}</p>
    </div>
  );
};

export default Notification;
