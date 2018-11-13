import React from 'react'
import classnames from 'classnames'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import { closeCart, hideCheckout } from '../../actions/cartActions'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Shipping.css'

const Checkout = props => {
  return (
    <StripeProvider apiKey="pk_test_MfkbDaiCvZdzlbXMqEdg6jqq">
      <div className={classnames('Checkout', {
        'Checkout_open': props.show
      })}>
        <div className="Cart__tray">
          {/* Back icon */}
          <div className="Cart__iconWrapper" onClick={props.hideCheckout}>
            <FontAwesomeIcon icon="chevron-left" className="cursor-pointer" />
          </div>
          <span>Payment Information</span>
          <span>{' '}</span>
        </div>
        <div className="m-5">
          {/* stripe checkout form */}
          <Elements>
            <CheckoutForm total={props.total} />
          </Elements>
          <p className="small text-dark mt-3"><FontAwesomeIcon className="mr-2" icon="lock" />Your information is secured through the ULS Stripe Payment Gateway.</p>
        </div>
      </div>
    </StripeProvider>
  );
}

const mapStateToProps = state => ({
  show: state.cart.showCheckout,
})

export default connect(mapStateToProps, { closeCart, hideCheckout })(Checkout)
