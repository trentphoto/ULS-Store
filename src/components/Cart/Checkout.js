import React from 'react'
import classnames from 'classnames'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import { closeCart, hideCheckout } from '../../actions/cartActions'
import { connect } from 'react-redux'
import './Shipping.css'

const Checkout = props => {
  return (
    <StripeProvider apiKey="pk_test_MfkbDaiCvZdzlbXMqEdg6jqq">
      <div className={classnames('Checkout', {
        'Checkout_open': props.show
      })}>
        <div className="Cart__tray">
          <span>{' '}</span>
          <span>Payment Information</span>
          <span>{' '}</span>
        </div>
        <div className="m-5">
          <Elements>
            <CheckoutForm total={props.total} />
          </Elements>
        </div>
      </div>
    </StripeProvider>
  );
}

const mapStateToProps = state => ({
  show: state.cart.showCheckout
})

export default connect(mapStateToProps, { closeCart, hideCheckout })(Checkout)
