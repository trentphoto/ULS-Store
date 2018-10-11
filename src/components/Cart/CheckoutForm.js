import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    const { total } = this.props
    let { token } = await this.props.stripe.createToken({name: "James"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: JSON.stringify({
        token: token.id,
        amount: total * 100
      })
    });

    if (response.ok) console.log(response)
    if (response.ok) this.setState({complete: true});
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <CardElement />
        <button className="btn btn-warning btn-block font-weight-bold" onClick={this.submit}>Complete Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
