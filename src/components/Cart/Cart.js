import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { closeCart, cartRemoveItem, showShipping, cartIncreaseItemQty, cartDecreaseItemQty } from '../../actions/cartActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DiscountCodeForm from './DiscountCodeForm'
import Shipping from './Shipping'
import Checkout from './Checkout'
import ThankYou from './ThankYou'
import './Cart.css'
import './CartTransitions.css'

const Cart = props => {
  const closeCart = () => props.closeCart()
  const removeItem = index => props.cartRemoveItem(index)
  const cartIncreaseItemQty = index => props.cartIncreaseItemQty(index)
  const cartDecreaseItemQty = index => props.cartDecreaseItemQty(index)

  // calculate total
  let subtotal;
  const shipping = 5;
  let total;
  let discount = 0;

  if (props.items.length) {
    subtotal = props.items.map(i => i.price * i.quantity).reduce((total, amount) => total + amount) // multiply cost by quantity for each item, then add all the items up

    if (props.appliedDiscountCode > 0) { // if a discount code has been applied
      total = (subtotal + shipping) * ((100 - props.appliedDiscountCode) / 100)
      discount = (subtotal + shipping) * (props.appliedDiscountCode / 100)

    } else { // else if no discount code has been applied
      total = subtotal + shipping
    }

  }

  return (
    <div className={classnames('l_Cart', {
      'l_Cart_open': props.cartOpen
    })}>
      <div className="l_Cart__overlay" onClick={closeCart}></div>
      <div className="Cart">
        <div className="Cart__tray">
          <div className="Cart__iconWrapper">
            <FontAwesomeIcon icon="shopping-basket" />
          </div>
          <span>Cart</span>
          <div className="Cart__iconWrapper" onClick={closeCart}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
          {
            props.items.map((i, index) => (
              <div className="Cart__item" key={index}>
                <div className="Cart__itemImage">
                  <img src={i.thumbnail} alt={i.name} />
                </div>
                <div className="Cart__itemInfo">
                  <span className="Cart__itemName">{i.name}</span>
                  <small>${i.price}</small>
                  {i.size !== 'generic' ? <small>Size: {i.size}</small> : ''}
                  <small className="Cart__itemRemove text-danger" onClick={removeItem.bind(this, index)}>Remove</small>
                </div>
                <div className="Cart__itemQuantity">
                  <div className="Cart__increaseQuantity Cart__iconWrapper" onClick={cartIncreaseItemQty.bind(this, index)}>
                    <FontAwesomeIcon icon="chevron-up" />
                  </div>
                  {i.quantity}
                  <div className="Cart__decreaseQuantity Cart__iconWrapper" onClick={cartDecreaseItemQty.bind(this, index)}>
                    <FontAwesomeIcon icon="chevron-down" />
                  </div>
                </div>
              </div>
              ))
            }
        <div className="p-4">
          {
            // if the cart contains items, display shipping btn - else, display empty message
            props.items.length ? (
              <React.Fragment>
                <p className="text-right"><small>Subtotal: ${subtotal.toFixed(2)}</small></p>
                <p className="text-right"><small>Shipping (US only): ${shipping.toFixed(2)}</small></p>
                {
                  props.appliedDiscountCode > 0 && (
                    <p className="text-right"><small>Discount: ${discount.toFixed(2)}</small></p>
                  )
                }
                <hr />
                <p className="text-right font-weight-bold">Total: ${total.toFixed(2)}</p>
                <DiscountCodeForm />
                <div className="btn btn-primary btn-block my-3" onClick={props.showShipping}>Step 2: Shipping Info
                  <FontAwesomeIcon className="ml-3" icon="chevron-right" />
                </div>
              </React.Fragment>
            ) : <p className="text-center">Your cart is empty.</p>
          }
        </div>
      </div>
      <Shipping />
      <Checkout total={total} />
      {
        props.checkoutComplete && <ThankYou />
      }
    </div>
  );
}

const mapStateToProps = state => ({
  cartOpen: state.cart.cartOpen,
  items: state.cart.cartItems,
  checkoutComplete: state.cart.checkoutComplete,
  appliedDiscountCode: state.cart.appliedDiscountCode,
})

export default connect(mapStateToProps, { closeCart, cartRemoveItem, showShipping, cartIncreaseItemQty, cartDecreaseItemQty })(Cart)
