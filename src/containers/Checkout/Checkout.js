import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // param = ['bacon', '1']
      if(param[0 ]=== 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] =+ param[1]; // -> bacon: 1
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
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
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients} 
              totalPrice={this.state.totalPrice} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;