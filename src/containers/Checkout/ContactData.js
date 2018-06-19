import React, { Component } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';
import classes from './ContactData.css';

import Button from '../../components/Button/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Name field cant be empty!'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Street field cant be empty!'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'ZIP code should be 5 digits!'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Country is required!'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        errorMessage: 'Wrong email format!'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    // loading: false,
    formIsValid: false
  };

  orderHandler = e => {
    e.preventDefault();

    const formData = {};

    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[
        formElementIndentifier
      ].value;
    }

    // console.log(formData)

    // this.setState({ loading: true });

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);

    // axios.post('/orders.json', order)
    //   .then(response => {
    //     // console.log(response);
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //     this.setState({ loading: false });
    //   });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
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
    updatedOrderFormElement.valid = this.checkValidity(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;
    // console.log(updatedOrderFormElement);
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    // console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    // console.log(formElementArray);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage}
            changed={e => this.inputChangedHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
