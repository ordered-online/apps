import api from '@ordered.online/api';

// Action Types
export const FETCH_CART_REQUEST = 'CART/FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'CART/FETCH_CART_SUCCESS';
export const FETCH_CART_FAILURE = 'CART/FETCH_CART_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  cart: null,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const cart = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return { ...state, fetching: true };

    case FETCH_CART_SUCCESS:
      return {
        ...state,
        fetching: false,
        cart: action.payload,
      };

    case FETCH_CART_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    // Default
    default:
      return { ...state };
  }
};

// Actions
export const fetchCartRequest = () => ({
  type: FETCH_CART_REQUEST,
});

export const fetchCartSuccess = cart => ({
  type: FETCH_CART_SUCCESS,
  payload: cart,
});

export const fetchCartFailure = error => ({
  type: FETCH_CART_FAILURE,
  payload: error,
});

// Exports
export const GetCart = () => (dispatch, getState) => {
  dispatch(fetchCartRequest());
  // TODO: implement Cart via websocket
  dispatch(fetchCartSuccess({}));
};

export default cart;
