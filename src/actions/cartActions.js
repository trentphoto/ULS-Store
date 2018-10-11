export const OPEN_CART = 'OPEN_CART'
export const CLOSE_CART = 'CLOSE_CART'
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const SHOW_SHIPPING = 'SHOW_SHIPPING'
export const HIDE_SHIPPING = 'HIDE_SHIPPING'
export const SHOW_CHECKOUT = 'SHOW_CHECKOUT'
export const HIDE_CHECKOUT = 'HIDE_CHECKOUT'
export const CART_INCREASE = 'CART_INCREASE'
export const CART_DECREASE = 'CART_DECREASE'
export const SUBMIT_SHIPPING_INFO = 'SUBMIT_SHIPPING_INFO'

export const openCart = () => dispatch => {
  dispatch({
    type: OPEN_CART
  })
}
export const closeCart = () => dispatch => {
  dispatch({
    type: CLOSE_CART
  })
}
export const showShipping = () => dispatch => {
  dispatch({
    type: SHOW_SHIPPING
  })
}
export const hideShipping = () => dispatch => {
  dispatch({
    type: HIDE_SHIPPING
  })
}
export const showCheckout = () => dispatch => {
  dispatch({
    type: SHOW_CHECKOUT
  })
}
export const hideCheckout = () => dispatch => {
  dispatch({
    type: HIDE_CHECKOUT
  })
}
export const cartAddItem = item => dispatch => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: item
  })
}
export const cartRemoveItem = index => dispatch => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: index
  })
}
export const cartIncreaseItemQty = index => dispatch => {
  dispatch({
    type: CART_INCREASE,
    payload: index
  })
}
export const cartDecreaseItemQty = index => dispatch => {
  dispatch({
    type: CART_DECREASE,
    payload: index
  })
}
export const submitShippingInfo = shippingInfo => dispatch => {
  dispatch({
    type: SUBMIT_SHIPPING_INFO,
    payload: shippingInfo
  })
}
