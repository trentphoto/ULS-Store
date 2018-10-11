import React from 'react'
import { connect } from 'react-redux'
import { showFullItem } from '../../actions/itemActions'
import './GridItem.css'

const GridItem = props => {
  const { item } = props

  return (
    <div className="GridItem" onClick={props.showFullItem.bind(this, item.id)}>
      <div className="GridItem__overlay">
        <div className="GridItem__title" dangerouslySetInnerHTML={{__html: item.title}} /> 
      </div>
      <div className="GridItem__image">
        <img src={item.thumbnail} alt={item.title} />
      </div>
    </div>
  );
}
export default connect(null, { showFullItem })(GridItem)
