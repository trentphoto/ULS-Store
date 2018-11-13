import {
  OPEN_CART,
  CLOSE_CART,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SHOW_SHIPPING,
  HIDE_SHIPPING,
  SHOW_CHECKOUT,
  HIDE_CHECKOUT,
  CART_INCREASE,
  CART_DECREASE,
  SUBMIT_SHIPPING_INFO,
  CHECKOUT_COMPLETE,
  GET_DISCOUNT_CODES_SUCCESS,
  APPLY_DISCOUNT,
} from '../actions/cartActions'

const initialState = {
  cartOpen: false,
  cartItems: [],
  showShipping: false,
  showCheckout: false,
  shippingInfo: {},
  checkoutComplete: false,
  discountCodes: [],
  appliedDiscountCode: 0,
}

export default function cartReducer(state = initialState, action){
  switch (action.type) {
    case GET_DISCOUNT_CODES_SUCCESS:
      const codes = action.payload.acf.discount_codes.map(i => i.discount_code)
      return {
        ...state,
        discountCodes: codes
      };
    case APPLY_DISCOUNT:
      return {
        ...state,
        appliedDiscountCode: action.payload
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpen: true
      };
    case CLOSE_CART:
      return {
        ...state,
        cartOpen: false,
        showShipping: false,
        showCheckout: false,
      };
    case CART_ADD_ITEM:
      if (state.cartItems.length === 0) { // if the cart was previously empty
        return {
          ...state,
          cartItems: [action.payload] // add only the new item
        };
      }

      const oldCart = state.cartItems

      let match = false

      const newCart = oldCart.map((i, index) => {
        if (i.id === action.payload.id && i.size === action.payload.size) {
          match = true
          i.quantity = i.quantity + action.payload.quantity // if the item is already in the cart we only update the quantity
        }
        return i;
      })

      // if the item matched, return the old cart with the new item
      if (match) {
        return {
          ...state,
          cartItems: newCart // return new cart with updated quantity
        };
      } else { // else if the item wasn't already in the cart, return the previous cart items along with the new one
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload]
        };
      }
    case CART_REMOVE_ITEM:
      const newCart2 = state.cartItems.filter((i, index) => index !== action.payload)
      return {
        ...state,
        cartItems: newCart2
      };
    case SHOW_SHIPPING:
      return {
        ...state,
        showShipping: true,
      };
    case HIDE_SHIPPING:
      return {
        ...state,
        showShipping: false,
      };
    case SHOW_CHECKOUT:
      return {
        ...state,
        showCheckout: true,
      };
    case HIDE_CHECKOUT:
      return {
        ...state,
        showCheckout: false,
      };
    case CART_INCREASE:
      const newCart3 = state.cartItems.map((i, index) => {
        if (index === action.payload) {
          i.quantity = i.quantity + 1
        }
        return i;
      })
      return {
        ...state,
        cartItems: newCart3
      };
    case CART_DECREASE:
      const newCart4 = state.cartItems.map((i, index) => {
        if (index === action.payload && i.quantity > 1) {
          i.quantity = i.quantity - 1
        }
        return i;
      })
      return {
        ...state,
        cartItems: newCart4
      };
    case SUBMIT_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      };
    case CHECKOUT_COMPLETE:
      return {
        ...state,
        checkoutComplete: true,
      };
    default:
      return state;
  }
}
