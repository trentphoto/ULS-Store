import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import FetchData from './components/FetchData'
import CartButton from './components/Cart/CartButton'
import Cart from './components/Cart/Cart'
import Grid from './components/Grid/Grid'
import FullView from './components/FullView/FullView'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faMinus, faPlus, faShoppingBasket, faChevronRight, faChevronLeft, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
library.add( faTimes, faMinus, faPlus, faShoppingBasket, faChevronRight, faChevronLeft, faChevronUp, faChevronDown )

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <FetchData />
          <FullView />
          <Grid />
          <CartButton />
          <Cart />
        </div>
      </Provider>
    );
  }
}

export default App;
