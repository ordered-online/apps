export const FETCH_CART_START = 'CART/FETCH_CART_START';
export const FETCH_CART_END = 'CART/FETCH_CART_END';

const initialState = {
  fetching: false,
  cart: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_START:
      return { ...state, fetching: true };

    case FETCH_CART_END:
      return {
        ...state,
        fetching: false,
        cart: action.payload,
      };

    default:
      return { ...state };
  }
};

export const fetchCartStart = () => ({
  type: FETCH_CART_START,
});

export const fetchCartEnd = cart => ({
  type: FETCH_CART_END,
  payload: cart,
});

export const GetCart = () => (dispatch, getState, api) => {
  dispatch(fetchCartStart());

  return api.GetCart().then(cart => dispatch(fetchCartEnd(cart)));
};
