import React from 'react'
import { connect } from 'react-redux'
import './Grid.css'

import GridItem from './GridItem'

const Grid = (props) => {
  return (
    <div className="Grid">
      {
        props.items.map(i => (
          <GridItem key={i.id} item={i} />
        ))
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.item.items
})

export default connect(mapStateToProps)(Grid)
