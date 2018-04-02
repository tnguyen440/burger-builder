import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import Spinner from '../../components/UI/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isLoading: false,
    error: null
  }

  componentDidMount() {
    axios.get('https://burger-builder-fe.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  purchasehandler = () => {
    this.setState({ purchasing: true });
  }

  updatePurchaseState = (ingredients) => {
    // const ingredients = {
    //   ...this.state.ingredients
    // }
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAdditon = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdditon;
    this.setState({ ingredients: updatedIngredients , totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients , totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // alert('You Continue')
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' +  this.state.totalPrice);
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' +queryString
    });
  }
 
  render() {
    const disableInfor = {
      ...this.state.ingredients
    };

    for (let key in disableInfor) {
      disableInfor[key] = disableInfor[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ?
      <p>Ingredients cant be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfor}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasehandler}
          />
         </React.Fragment>
        );
      orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }
    if (this.state.isLoading) {
      orderSummary = <Spinner />
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);