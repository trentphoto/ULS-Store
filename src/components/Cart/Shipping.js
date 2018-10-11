import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { closeCart, hideShipping, submitShippingInfo, showCheckout } from '../../actions/cartActions'
import './Shipping.css'

class Shipping extends React.Component {
  constructor(props){
    super(props)
    this.firstNameRef = React.createRef()
    this.lastNameRef = React.createRef()
    this.emailRef = React.createRef()
    this.addressRef = React.createRef()
    this.cityRef = React.createRef()
    this.stateRef = React.createRef()
    this.zipRef = React.createRef()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.submitShippingInfo({
      firstName: this.firstNameRef.current.value,
      lastName: this.lastNameRef.current.value,
      email: this.emailRef.current.value,
      address: this.addressRef.current.value,
      city: this.cityRef.current.value,
      state: this.stateRef.current.value,
      zip: this.zipRef.current.value,
    })
    this.props.showCheckout()
  }
  // closeCart = () => this.props.closeCart()
  render(){
    return (
        <div className={classnames('Shipping', {
          'Shipping_open': this.props.show
        })}>
        <div className="Cart__tray">
          <div className="Cart__iconWrapper" onClick={this.props.hideShipping}>
            <FontAwesomeIcon icon="chevron-left" className="cursor-pointer" />
          </div>
          <span>Shipping Information</span>
          <div className="Cart__iconWrapper" onClick={this.props.closeCart}>
            <FontAwesomeIcon icon="times" className="Cart__close" />
          </div>
        </div>
        <form className="m-5" onSubmit={this.handleSubmit}>
          <div className="form-row form-group">
            <div className="col">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" ref={this.firstNameRef} className="form-control" placeholder="First Name" />
            </div>
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" ref={this.lastNameRef} className="form-control" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={this.emailRef} className="form-control" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" ref={this.addressRef} className="form-control" placeholder="Street Address" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" name="city" ref={this.cityRef} className="form-control" placeholder="Street Address" />
          </div>
          <div className="form-group form-row">
            <div className="col">
              <label htmlFor="state">State</label>
              <input type="text" name="state" ref={this.stateRef} className="form-control" placeholder="State" />
            </div>
            <div className="col">
              <label htmlFor="zip">Zip Code</label>
              <input type="text" name="zip" ref={this.zipRef} className="form-control" placeholder="ZIP Code" />
            </div>
          </div>
          <input type="submit" value="Next: Checkout" className="btn btn-primary btn-lg btn-block" />
        </form>
      </div>
  );
  }
}

const mapStateToProps = state => ({
  show: state.cart.showShipping
})

export default connect(mapStateToProps, { closeCart, hideShipping, submitShippingInfo, showCheckout })(Shipping)
