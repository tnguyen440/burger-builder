import React from 'react';
import classnames from 'classnames';
import classes from './Button.css';

const button = (props) => {
  const buttonClasses = classnames(
    classes.Button,
    classes[props.btnType]
  );
  return (
    <button
      disabled={props.disabled}
      className={buttonClasses}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default button;