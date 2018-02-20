import React from 'react';
import logoImg from '../../assets/images/burger-logo.png';

import classes from './Logo.css';

const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={logoImg} alt='My Burger' />
    </div>
  );
};

export default logo;