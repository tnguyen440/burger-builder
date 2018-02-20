import React from 'react';

import classes from './DrawerTogger.css';

const drawerToggle = (props) => {
  return (
    <div onClick={props.clicked}>
      MENU
    </div>
  );
};

export default drawerToggle;