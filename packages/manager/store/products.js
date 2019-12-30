import api from '@ordered.online/api';

import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from './authentication';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'PRODUCT/FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'PRODUCT/FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'PRODUCT/FETCH_PRODUCTS_FAILURE';

const initialState = {
  fetching: false,
  products: {},
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const products = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, fetching: true };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        products: { ...state.products, ...action.payload },
      };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, error: action.payload };

    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
    default:
      return { ...state };
  }
};

// Actions
const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

const fetchProductsSuccess = product => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: product,
});

const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

/**
 * Take an array of locations from the REST API
 * and transform them into a object where
 * the key's are the location id's and the
 * value's are the location object's.
 *
 * @param {array} locations
 */
const reformatProducts = products => {
  const initialValue = {};
  return products.reduce((obj, item) => {
    return {
      ...obj,
      [item['id']]: item,
    };
  }, initialValue);
};

// Exports
export const GetProduct = productId => (dispatch, getState) => {
  dispatch(fetchProductsRequest());

  return api
    .getProduct(productId)
    .then(products => dispatch(fetchProductsSuccess(products)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export const FindProduct = query => (dispatch, getState) => {
  dispatch(fetchProductsRequest());

  return api
    .findProduct(query)
    .then(products => dispatch(fetchProductsSuccess(products)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export default products;
