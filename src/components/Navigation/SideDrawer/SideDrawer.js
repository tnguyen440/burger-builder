import React from 'react';
import classnames from 'classnames';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {
  const attachedClasses = classnames(
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close
  );
  return (
    <React.Fragment>
      <Backdrop
        show={props.open}
        clicked={props.closed}
      />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </div>
    </React.Fragment>
  );
};

export default sideDrawer;