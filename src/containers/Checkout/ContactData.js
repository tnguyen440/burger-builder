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

    const formData = {};

    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value;
    }

    // console.log(formData)

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
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

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    // console.log('updatedOrderForm', updatedOrderForm);

    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    // console.log('updatedOrderFormElement', updatedOrderFormElement);

    updatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
    
    this.setState({ orderForm:  updatedOrderForm });
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
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => 
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changed={(e) => this.inputChangedHandler(e, formElement.id)}
          />
        )}
        <Button 
          btnType='Success'
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