import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { completeCheckout } from '../../actions/cartActions'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      done: false,
      error: false
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {

    this.setState({submitting: true});

    const { total, completeCheckout, cartItems, shippingInfo } = this.props
    let { token } = await this.props.stripe.createToken({name: "James"});

    const cartItemDescriptions = cartItems.map(i => i.name)
    const orderDescription = cartItemDescriptions.join()

    let response = await fetch("https://node-uls.herokuapp.com/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: JSON.stringify({
        token: token.id,
        amount: total * 100,
        desc: 'ULS Online Store'
      })
    });

    if (response.ok) {
      this.setState({done: true})

      const orderInfo = {
        'shippingInfo': shippingInfo,
        'order total': total,
        'cartItems': cartItems,
      }

      // send order to zapier
      fetch("https://hooks.zapier.com/hooks/catch/623075/ee9etx/", {
        method: 'POST',
        body: JSON.stringify(orderInfo)
      }).then(() => console.log(1))

      // set app state to checked out - show thank you page
      completeCheckout()

    } else {
      this.setState({submitting: false})
      this.setState({error: true})
    }
  }

  render() {

    return (
      <div className="checkout">
        {
          !this.props.checkoutComplete && ( // this line makes the button disappear after submission is complete
            <React.Fragment>
              <CardElement className="CardElement" />
              <button className="btn btn-warning btn-block font-weight-bold CheckoutBtn" onClick={this.submit}>
                {
                  this.state.submitting ? <FontAwesomeIcon className="checkout__submitting" icon="spinner" /> : <span>Complete Purchase</span>
                }
              </button>
              {
                this.state.error && <p>Your payment could not be processed. Please try again.</p>
              }
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkoutComplete: state.cart.checkoutComplete,
  shippingInfo: state.cart.shippingInfo,
  cartItems: state.cart.cartItems
})

export default connect(mapStateToProps, { completeCheckout })(injectStripe(CheckoutForm));
