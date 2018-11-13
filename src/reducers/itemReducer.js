import { GET_ITEMS_SUCCESS, SHOW_FULL_ITEM, CLOSE_FULL_VIEW } from '../actions/itemActions'

const initialState = {
  items: [],
  itemsLoading: true,
  showFullView: false,
  FullViewItemID: null,
}

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_SUCCESS:
      const items = action.payload.map(i => {
        const decodeHtml = html => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        }
        const primaryImg = i._embedded ? `https://unitedlutheranseminary.edu${i._embedded['wp:featuredmedia'][0].source_url}` : null // add the full URL to the featured image
        const secondaryImgs = i.acf.images ? i.acf.images.map(i => `https://unitedlutheranseminary.edu${i.image}`) : null // add the full URL to each secondary image
        if (primaryImg && secondaryImgs) secondaryImgs.unshift(primaryImg) // add the primary image to the secondary images array

        const a = {
          id: i.id,
          title: decodeHtml(i.title.rendered),
          thumbnail: primaryImg,
          desc: i.acf.description,
          images: secondaryImgs ? secondaryImgs : [primaryImg], // if there are no secondary images, make this a single-item array with the primary image
          sizes: i.acf.sizes,
          price: i.acf.price,
          inStock: i.acf.in_stock
        }

        return a;
      })
      return {
        ...state,
        itemsLoading: false,
        items,
        FullViewItemID: action.payload[0].id
      };
    case SHOW_FULL_ITEM:
      return {
        ...state,
        showFullView: true,
        FullViewItemID: action.payload,
      };
    case CLOSE_FULL_VIEW:
      return {
        ...state,
        showFullView: false
      };
    default:
      return state;
  }
}
