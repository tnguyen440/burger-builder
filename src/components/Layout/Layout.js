import React from 'react';

const layout = (props) => (
  <React.Fragment>
    <div> toolbar, sidedrawer, backdrop</div>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;