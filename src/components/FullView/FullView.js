import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageGallery from 'react-image-gallery'
import { closeFullView } from '../../actions/itemActions'
import { cartAddItem, openCart } from '../../actions/cartActions'
import './FullView.css'
import './Select.css'
import "react-image-gallery/styles/css/image-gallery.css";

class FullView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedSize: null,
      selectedQuantity: 1,
      currentItemID: null,
      mainImageUrl: null,
      func: this._imageGallery
    }
  }
  static getDerivedStateFromProps(props, state){
    // if the item exists and if state is not already defined - only true on initial render
    if (props.item && (props.item.id !== state.currentItemID)){
      return {
        selectedSize: props.item.sizes[0] === 'generic' ? props.item.sizes[0] : null,
        currentItemID: props.item.id,
        selectedQuantity: 1,
        mainImageUrl: props.item.thumbnail
      }
    }
    return null;
  }
  updateSize = size => {
    if (this.props.item.sizes.length > 1){
      this.setState({selectedSize: size})
    }
  }

  resetGalleryIndex = () => {
    if (this._imageGallery) {
      this._imageGallery.slideToIndex(0);
    }
  }

  incrementQuantity = () => this.setState((prevState) => {
    return {
      selectedQuantity: prevState.selectedQuantity + 1
    };
  })

  decrementQuantity = () => {
    if (this.state.selectedQuantity > 1) {
      this.setState((prevState) => {
        return {
          selectedQuantity: prevState.selectedQuantity - 1
        };
      })
    }
  }
  galleryImageFocus = url => this.setState({mainImageUrl: url})
  secondaryImages = item => {
    if (item.images) {
      const a = item.images.map(url => (
        <img src={url} alt={item.title} className={classnames('img-fluid', {
          'active': url === this.state.mainImageUrl
        })} onClick={this.galleryImageFocus.bind(this, url)} />
      ))
      return (
        <React.Fragment>
          <img src={item.thumbnail} alt={item.title} className={classnames('img-fluid', {
            'active': item.thumbnail === this.state.mainImageUrl
          })} onClick={this.galleryImageFocus.bind(this, item.thumbnail)} />
          {a}
        </React.Fragment>
      );
    }
  }
  secondaryImagesArr = item => {
    if (item.images) {
      return item.images.map(i => ({
        original: i,
        thumbnail: i
      }));
    }
  }
  addToCart = () => {
    this.props.cartAddItem({
      id: this.props.item.id,
      name: this.props.item.title,
      quantity: this.state.selectedQuantity,
      size: this.state.selectedSize,
      price: this.props.item.price,
      thumbnail: this.props.item.thumbnail
    })
    this.props.openCart()
  }

  render(){
    const { item } = this.props

    if (!item){
      return null;
    }

    this.resetGalleryIndex()

    return (
      <div className={classnames('FullView', {
        'FullView_open': this.props.showFullView
      })}>
      <div className={classnames('FullView__left', {
        'FullView__left_open': this.props.showFullView
      })}>
      <ImageGallery
        items={this.secondaryImagesArr(item)}
        showPlayButton={false}
        showFullscreenButton={false}
        ref={i => this._imageGallery = i}
      />
    </div>
    <div className={classnames('FullView__right', {
      'FullView__right_open': this.props.showFullView
    })}>
    <div className="FullView__close" onClick={this.props.closeFullView}>
      <FontAwesomeIcon icon="times" />
    </div>
    <h2>
      {item.title}
    </h2>
    <div className="font-weight-bold mb-3">
      ${item.price}
      {
        item.inStock ? <div className="badge badge-success ml-3">In Stock</div> : <div className="badge badge-danger ml-3">Out of Stock</div>
      }
    </div>
    <div dangerouslySetInnerHTML={{__html: item.desc}} />

    <div className="FullView__btn-group mb-3">
      {
        item.sizes.map(i => (
          i !== 'generic' && (
            <div key={i} onClick={this.updateSize.bind(this, i)} className={classnames('btn btn-light', {
              'active': i === this.state.selectedSize
            })}>
            {i}
          </div>
          )
        ))
      }
    </div>
    <p>Quantity</p>
    <div className="Select mb-3">
      <button type="button" className="input-group-button btn btn-primary input-group-button-left" onClick={this.decrementQuantity}>
        <FontAwesomeIcon icon="minus" />
      </button>
      <input className="input-group-field" type="number" readOnly value={this.state.selectedQuantity} />
      <button type="button" className="input-group-button btn btn-primary input-group-button-right" onClick={this.incrementQuantity}>
        <FontAwesomeIcon icon="plus" />
      </button>
    </div>

    <button disabled={!this.state.selectedSize || !item.inStock} className="btn FullView__AddToCartBtn" onClick={this.addToCart}>
      + Add to Cart
    </button>
  </div>
</div>
);
  }
}

const mapStateToProps = state => ({
  items: state.item.items,
  showFullView: state.item.showFullView,
  itemID: state.item.FullViewItemID,
  item: state.item.items.filter(i => i.id === state.item.FullViewItemID)[0]
})

export default connect(mapStateToProps, { closeFullView, cartAddItem, openCart })(FullView)
