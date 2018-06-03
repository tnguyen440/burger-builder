import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // param = ['bacon', '1']
  //     if(param[0]=== 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] =+ param[1]; // -> bacon: 1
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  // componentWillMount() {
  //   this.props.purchaseInit();
  // }

  checkoutCancellHandler = () => {
    this.props.history.goBack();
  };

  checkoutCountinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ?  <Redirect to="/" /> : null;
      summary = 
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutContinued={this.checkoutCountinueHandler}
            checkouCancelled={this.checkoutCancellHandler}
          />
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}
          />
        </div>
      ;
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

// const mapDispatchTopProps = dispatch => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   }
// }

export default connect(mapStateToProps)(Checkout);
