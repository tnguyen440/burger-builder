import React, { Component } from 'react';
import axios from '../../axios-order';
import classes from './ContactData.css';

import Button from '../../components/Button/Button';
import Spinner from '../../components/UI/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street : '',
      postCode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Minh Nguyen',
        address: {
          street: '1 Infinity Loop',
          zipCode: '100000',
          country: 'Vietnam'
        },
        email: 'test@gmail.com'
      },
      deliverMethod: 'slowest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        // console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your Name' />
        <input type='email' name='email' placeholder='Your Mail' />
        <input type='text' name='street' placeholder='Your Street' />
        <input type='text' name='postal' placeholder='Postal Code' />
        <Button 
          btnType='Success'
          clicked={(e) => this.orderHandler(e)}
        >
          ORDER
        </Button>
      </form>
    ); 

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;