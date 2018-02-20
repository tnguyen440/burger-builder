import React from 'react';
import logoImg from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => {
  const inlineStlye = {
    height: props.height
  }
  return (
    <div className={classes.Logo} style={inlineStlye}>
      <img src={logoImg} alt='My Burger' />
    </div>
  );
};

export default logo;