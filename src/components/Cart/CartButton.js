import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { openCart, closeCart } from '../../actions/cartActions'
import './CartButton.css'

const CartButton = props => {
  const openCart = () => props.openCart()

  return (
    <div className="CartButton" onClick={openCart}>
      {
        props.itemCount ? <div className="CartButton__status">{props.itemCount}</div> : ''
      }
      <FontAwesomeIcon icon="shopping-basket" />
    </div>
  );
}

const mapStateToProps = state => ({
  itemCount: state.cart.cartItems.length
})

export default connect(mapStateToProps, { openCart, closeCart })(CartButton)
