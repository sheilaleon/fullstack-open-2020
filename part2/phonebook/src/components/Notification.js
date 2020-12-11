import React from 'react';

const Notification = ({ notification, notificationState }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div className={`notification ${notificationState}`}>
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
