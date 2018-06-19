import React, { Component } from 'react';
import { connect }  from 'react-redux';
import classes from './Orders.css';
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

class Orders extends Component {
  // state = { 
  //   orders: [],
  //   loading: false
  // }

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
    // axios.get('/orders.json')
    //   .then(res => {
    //     const fetchedOrders = [];
    //     for(let key in res.data) {
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => 
        <Order 
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    }

    return (
      <div className={classes.Orders}>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));