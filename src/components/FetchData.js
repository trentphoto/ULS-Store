import React from 'react'
import { connect } from 'react-redux'
import { getItems } from '../actions/itemActions'

class FetchData extends React.Component {
  componentDidMount(){
    this.props.getItems()
  }
  render(){
    return null;
  }
}

export default connect(null, { getItems })(FetchData)
