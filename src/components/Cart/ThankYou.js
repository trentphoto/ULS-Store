import React from 'react'
import './ThankYou.css'

const ThankYou = props => (
  <div className="ThankYou">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img src="http://unitedlutheranseminary.edu/wp-content/themes/uls/images/logo-blue-stacked.svg" alt="United Lutheran Seminary" className="ThankYou__logo d-block mx-auto"/>
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
