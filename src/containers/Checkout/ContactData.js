import React, { Component } from 'react';
import axios from '../../axios-order';
import classes from './ContactData.css';

import Button from '../../components/Button/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: ''
      },
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
    };

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
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    // console.log(formElementArray);
    let form = (
      <form>
        {formElementArray.map(formElement => 
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
          />
        )}
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