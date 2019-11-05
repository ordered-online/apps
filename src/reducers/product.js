import api from '../api';

// Action Types
export const FETCH_PRODUCT_REQUEST = 'PRODUCT/FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'PRODUCT/FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'PRODUCT/FETCH_PRODUCT_FAILURE';

const initialState = {
  fetching: false,
  product: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return { ...state, fetching: true };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        product: action.payload,
      };

    case FETCH_PRODUCT_FAILURE:
      return { ...state, error: action.payload };

    default:
      return { ...state };
  }
};

export const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});

export const GetProduct = productId => (dispatch, getState) => {
  dispatch(fetchProductRequest());

  return api
    .getProduct(productId)
    .then(product => dispatch(fetchProductSuccess(product)))
    .catch(error => dispatch(fetchProductFailure(error)));
};

export const FindProduct = query => (dispatch, getState) => {
  dispatch(fetchProductRequest());

  return api
    .findProduct(query)
    .then(product => dispatch(fetchProductSuccess(product)))
    .catch(error => dispatch(fetchProductFailure(error)));
};
