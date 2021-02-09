import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

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
          <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
      </div>
      <div style={show}>
        {props.children}
        <Button variant="outline-primary" size="sm" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </>
  );
});

Toggle.displayName = 'Toggle';

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggle;
