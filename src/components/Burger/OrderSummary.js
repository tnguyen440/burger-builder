import React, { Component } from 'react';
import Button from '../Button/Button';

// import classes from './OrderSummary.css';

class OrderSummary extends Component {
  // this could be a functional component, doesn'tgit status have to be a class
  // componentWillUpdate() {
  //   console.log('[OrderSummary] componentWillUpdate');
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => 
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>);

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout ?</p>
        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </React.Fragment>
    )
  }
}

export default OrderSummary;