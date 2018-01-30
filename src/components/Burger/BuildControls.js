import React from 'react';

import BuildControl from './BuildControl';

import classess from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classess.BuildControls}>
    <p>Current Price: <strong>{props.price}</strong></p>
    {controls.map(ctrl => {
      return <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />;
    })}
  </div>
);

export default buildControls;