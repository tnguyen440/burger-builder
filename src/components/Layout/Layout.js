import React from 'react';
import classes from './Layout.css';

const layout = (props) => (
  <React.Fragment>
    <div> toolbar, sidedrawer, backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;