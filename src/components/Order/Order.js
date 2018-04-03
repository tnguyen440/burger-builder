import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  // let transfromedIngedient = Object.keys(props.ingredients)
  //   .map(igKey => {
  //     return [...Array(props.ingredients[igKey])].map((_, i) => {
  //       return <BurgerIngredient key={igKey + i} type={igKey} />;
  //     }); // [,]
  //   })
  //   .reduce((arr, el) => {
  //     return arr.concat(el)
  //   }, []);
  let ingredients = [];
  for(let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(i => 
    <span 
      key={i.name} 
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid  #ccc',
        padding: '5px'
      }}
    >
      {i.name}: ({i.amount})
    </span>
  );

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;