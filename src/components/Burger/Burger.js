import React from 'react';

import classess from './Burger.css';
import BurgerIngredient from './BurgerIngredient';

const burger = (props) => {
  return (
    <div className={classess.Burger}>
      <BurgerIngredient type='bread-top' />
      <BurgerIngredient type='cheese' />
      <BurgerIngredient type='meat' />
      <BurgerIngredient type='bread-bottom' />

    </div>
  );
};

export default burger;