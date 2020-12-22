import React, { useState } from 'react';

const Toggle = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? 'none' : '' };
  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hide}>
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility} className="btn-sm secondary">
          Cancel
        </button>
      </div>
    </>
  );
};

export default Toggle;
