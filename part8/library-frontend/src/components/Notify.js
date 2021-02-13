import React from 'react';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ margin: '10px 0', color: 'red' }}>{errorMessage}</div>;
};

export default Notify;
