import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat:1, 
      cheese:1,
      bacon: 1
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // param = ['bacon', '1']
      ingredients[param[0]] =+ param[1]; // -> bacon: 1
    }
    this.setState({ ingredients });
  }

  checkoutCancellHandler = () => {
    this.props.history.goBack();
  }

  checkoutCountinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutCountinueHandler}
          checkouCancelled={this.checkoutCancellHandler}
        />
        <Route 
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;