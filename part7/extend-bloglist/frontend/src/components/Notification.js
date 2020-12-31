import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification.message) {
    return null;
  } else {
    return (
      <div className={`notification ${notification.notificationType}`}>
        <div>
          <p>{notification.message}</p>
        </div>
      </div>
    );
  }
};

export default Notification;
