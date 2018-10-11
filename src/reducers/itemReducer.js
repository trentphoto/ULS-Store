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
        const fullURLs = i.acf.images ? i.acf.images.map(i => `https://unitedlutheranseminary.edu${i.image}`) : null
        const a = {
          id: i.id,
          title: decodeHtml(i.title.rendered),
          thumbnail: i._embedded ? `https://unitedlutheranseminary.edu${i._embedded['wp:featuredmedia'][0].source_url}` : null,
          desc: i.acf.description,
          images: fullURLs,
          sizes: i.acf.sizes,
          price: i.acf.price
        }

        // a.colors = a.colors.map(i => {
        //   const fullURLs = i.images.map(img => `https://unitedlutheranseminary.edu${img.image}`)
        //   i.fullURLs = fullURLs;
        //   return i;
        // })

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
