import React from 'react';

import classess from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
  let transfromedIngedient = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      }); // [,]
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);

    if (transfromedIngedient.length ===0) {
      transfromedIngedient = <p>Please add ingredients</p>;
    }

  return (
    <div className={classess.Burger}>
      <BurgerIngredient type='bread-top' />
      {transfromedIngedient}
      <BurgerIngredient type='bread-bottom' />

    </div>
  );
};

export default burger;