import React from 'react'
import './ThankYou.css'
import logo from '../../img/logo.svg'

const ThankYou = props => (
  <div className="ThankYou">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img src={logo} className="ThankYou__logo d-block mx-auto"/>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="display-4">Purchase Complete</h1>
          <p className="lead">Thank You!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <p className="lead">Check your email for your order confirmation.</p>
        </div>
      </div>
    </div>
  </div>
)

export default ThankYou
