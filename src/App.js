import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import FetchData from './components/FetchData'
import FullView from './components/FullView/FullView'
import Grid from './components/Grid/Grid'
import CartButton from './components/Cart/CartButton'
import Cart from './components/Cart/Cart'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faMinus, faPlus, faShoppingBasket, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faSpinner, faLock } from '@fortawesome/free-solid-svg-icons'
library.add( faTimes, faMinus, faPlus, faShoppingBasket, faChevronRight, faChevronLeft, faChevronUp, faChevronDown, faSpinner, faLock )

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
