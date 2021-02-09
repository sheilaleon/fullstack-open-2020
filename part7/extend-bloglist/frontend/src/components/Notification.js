import React from 'react';
import { useSelector } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification.message) {
    return null;
  } else {
    return (
      <>
        <Alert variant={`${notification.notificationType}`}>
          {notification.message}
        </Alert>
      </>
    );
  }
};

export default Notification;
