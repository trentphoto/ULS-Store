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
    <StripeProvider apiKey="pk_live_oQzZISPAmY77Cynuj1jUurJ3">
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
          <h4>Review your order</h4>
          {
            props.items.map((i, index) => (
              <div className="Cart__item" key={index}>
                <div className="Cart__itemInfo">
                  <span className="Cart__itemName">{i.name}</span>
                  {i.size !== 'generic' ? <small>Size: {i.size}</small> : ''}
                </div>
                <div className="Cart__itemQuantity">
                  {i.quantity}
                </div>
              </div>
              ))
          }
          <p className="text-right font-weight-bold mt-3">Total: ${props.total && props.total.toFixed(2)}</p>
          <h4 className="mt-5 mb-3">Payment Information</h4>
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
  items: state.cart.cartItems,
})

export default connect(mapStateToProps, { closeCart, hideCheckout })(Checkout)
