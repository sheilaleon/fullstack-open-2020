import React, { useState, useImperativeHandle } from 'react';

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? 'none' : '' };
  const show = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

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
});

export default Toggle;
