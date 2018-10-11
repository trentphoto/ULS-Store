import axios from 'axios'

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'
export const SHOW_FULL_ITEM = 'SHOW_FULL_ITEM'
export const CLOSE_FULL_VIEW = 'CLOSE_FULL_VIEW'

const ApiUrl = 'https://unitedlutheranseminary.edu/wp-json/wp/v2/store?_embed&per_page=50'

export const getItems = () => async dispatch => {
  const res = await axios.get(ApiUrl)
  dispatch({
    type: GET_ITEMS_SUCCESS,
    payload: res.data
  })
}
export const showFullItem = itemID => dispatch => {
  dispatch({
    type: SHOW_FULL_ITEM,
    payload: itemID
  })
}
export const closeFullView = () => dispatch => {
  dispatch({
    type: CLOSE_FULL_VIEW
  })
}
