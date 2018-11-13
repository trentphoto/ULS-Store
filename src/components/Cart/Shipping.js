import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { closeCart, hideShipping, submitShippingInfo, showCheckout } from '../../actions/cartActions'
import './Shipping.css'

class Shipping extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstNameErr: false,
      lastNameErr: false,
      emailErr: false,
      addressErr: false,
      cityErr: false,
      stateErr: false,
      zipErr: false,
    }
    this.firstNameRef = React.createRef()
    this.lastNameRef = React.createRef()
    this.emailRef = React.createRef()
    this.addressRef = React.createRef()
    this.cityRef = React.createRef()
    this.stateRef = React.createRef()
    this.zipRef = React.createRef()

    this.emailValidate = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
  }
  showErrors = () => {
    let flag = false;
    if (this.firstNameRef.current.value.length < 1) {
      this.setState({firstNameErr: true})
      flag = true;
    } else {
      this.setState({firstNameErr: false});
    }
    if (this.lastNameRef.current.value.length < 1) {
      this.setState({lastNameErr: true})
      flag = true;
    } else {
      this.setState({lastNameErr: false});
    }
    if (! this.emailValidate.test(this.emailRef.current.value)) {
      this.setState({emailErr: true});
      flag = true;
    } else {
      this.setState({emailErr: false});
    }
    if (this.addressRef.current.value.length < 1) {
      this.setState({addressErr: true})
      flag = true;
    } else {
      this.setState({addressErr: false});
    }
    if (this.cityRef.current.value.length < 1) {
      this.setState({cityErr: true})
      flag = true;
    } else {
      this.setState({cityErr: false});
    }
    if (this.stateRef.current.value.length < 2) {
      this.setState({stateErr: true})
      flag = true;
    } else {
      this.setState({stateErr: false});
    }
    if (this.zipRef.current.value.length < 5) {
      this.setState({zipErr: true})
      flag = true;
    } else {
      this.setState({zipErr: false});
    }
    return flag;
  }
  handleSubmit = e => {
    e.preventDefault()

    if (! this.showErrors() ) { // if fields are validated then submit shipping info and show checkout

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
              <input type="text" name="firstName" ref={this.firstNameRef} className={classnames('form-control', {
                'is-invalid': this.state.firstNameErr
              })} placeholder="First Name" />
            </div>
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" ref={this.lastNameRef} className={classnames('form-control', {
                'is-invalid': this.state.lastNameErr
              })} placeholder="Last Name" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" ref={this.emailRef} className={classnames('form-control', {
              'is-invalid': this.state.emailErr
            })} placeholder="Email" />
            <div className="invalid-feedback">Please enter a valid email address.</div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" ref={this.addressRef} className={classnames('form-control', {
              'is-invalid': this.state.addressErr
            })} placeholder="Street Address" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" name="city" ref={this.cityRef} className={classnames('form-control', {
              'is-invalid': this.state.cityErr
            })} placeholder="Street Address" />
          </div>
          <div className="form-group form-row">
            <div className="col">
              <label htmlFor="state">State</label>
              <input type="text" name="state" ref={this.stateRef} className={classnames('form-control', {
                'is-invalid': this.state.stateErr
              })} placeholder="State" />
            </div>
            <div className="col">
              <label htmlFor="zip">Zip Code</label>
              <input type="text" name="zip" ref={this.zipRef} className={classnames('form-control', {
                'is-invalid': this.state.zipErr
              })} placeholder="ZIP Code" />
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
