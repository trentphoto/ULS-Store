import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { applyDiscount } from '../../actions/cartActions'

class DiscountCodeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      codeInput: '',
      success: false,
      error: false,
    }
  }
  handleCodeInput = e => {
    this.setState({codeInput: e.target.value})
  }
  handleFormSubmit = e => {
    e.preventDefault()

    let match = {
      correct: false,
      percentage: 0
    }

    this.props.discountCodes.map(i => { // map over the discount codes and search for a match
      if (i.code.toLowerCase() === this.state.codeInput.toLowerCase()) { // codes match
        match.correct = true
        match.percentage = i.percentage
      }
    })

    if (match.correct) { // if a match was found
      this.setState({success: true})
      this.setState({error: false})
      this.setState({message: 'Success! Discount code applied.'})
      this.props.applyDiscount(match.percentage)

      // message goes away after 3 sec
      setTimeout(() => this.setState({message: ''}), 3000)
    } else {
      this.setState({success: false})
      this.setState({error: true})
      this.setState({message: 'We\'re sorry. That discount code was not found.'})
    }

  }
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        { !this.state.success && ( // only show the form if a discount code has not been applied yet
          <div className="input-group input-group-sm">
            <input className="form-control form-control-sm text-right" name="discountCode" placeholder="Have a discount code?" value={this.state.codeInput} onChange={this.handleCodeInput} />
            <div className="input-group-append">
              <button type="submit" className="input-group-text">Apply</button>
            </div>
          </div>
        )}
        <div className={classnames('my-2 text-right small', {
          'text-danger': this.state.error,
          'text-success': this.state.success
        })}>{this.state.message}</div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  discountCodes: state.cart.discountCodes
})

export default connect(mapStateToProps, { applyDiscount })(DiscountCodeForm)
