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
      error: '',
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {

    const { total, completeCheckout, cartItems, shippingInfo } = this.props

    this.setState({submitting: true});
    this.setState({error: ''});

    // set up order info

    const orderNumber = Math.ceil((Math.random().toFixed(5))*100000) // random number of 5 decimal places, multiplied by 10^6, rounded using .ceil()
    const orderDate = new Date().toString()
    const orderItems = cartItems.map(i => ({
      'Name': i.name,
      'Quantity': i.quantity,
      'Size': i.size,
      'Price Each': i.price
    }))

    this.props.stripe.createToken({name: `${shippingInfo.firstName} ${shippingInfo.lastName}`}).then(async ({token, error}) => {
      if (error) {

        this.setState({submitting: false})
        this.setState({error: error.message})

      } else { // if the token is successfully created

        // create description
        const cartItemNames = cartItems.map(i => i.name)
        const orderDescription = cartItemNames.join()

        let response = await fetch("https://node-uls.herokuapp.com/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: JSON.stringify({
            token: token.id,
            amount: total * 100,
            desc: `ULS Online Store: ${orderDescription}`
          })
        });
        // send the stripe request

        if (response.ok) { // if stripe succeeds, process the order
          this.setState({done: true})
          this.setState({error: ''})

          const orderInfo = {
            'shippingInfo': shippingInfo,
            'order total': total,
            'cartItems': orderItems,
            'orderNumber': orderNumber,
            'orderDate': orderDate,
          }

          // send order to zapier
          fetch("https://hooks.zapier.com/hooks/catch/623075/ee9etx/", {
            method: 'POST',
            body: JSON.stringify(orderInfo)
          })

          completeCheckout()

        } else {
          this.setState({submitting: false})
          this.setState({error: 'Your payment could not be processed. Please try again.'})
        }

      }
    })

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
                this.state.submitting && <p>Processing...</p>
              }
              {
                this.state.error && <p className="text-danger">{this.state.error}</p>
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
