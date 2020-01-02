import api from '@ordered.online/api';
import { push } from 'connected-react-router';

import { LOGOUT_SUCCESS, LOGOUT_FAILURE } from './authentication';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'PRODUCT/FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'PRODUCT/FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'PRODUCT/FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'PRODUCT/CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'PRODUCT/CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'PRODUCT/CREATE_PRODUCT_FAILURE';

export const EDIT_PRODUCT_REQUEST = 'PRODUCT/EDIT_PRODUCT_REQUEST';
export const EDIT_PRODUCT_SUCCESS = 'PRODUCT/EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAILURE = 'PRODUCT/EDIT_PRODUCT_FAILURE';

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
      return state;
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

const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

const createProductSuccess = product => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

const createProductFailure = error => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

const editProductRequest = () => ({
  type: EDIT_PRODUCT_REQUEST,
});

const editProductSuccess = product => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: product,
});

const editProductFailure = error => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});

/**
 * Take an array of products from the REST API
 * and transform them into a object where
 * the key's are the product id's and the
 * value's are the product object's.
 *
 * @param {array} products
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
export const GetProduct = product_id => (dispatch, getState) => {
  dispatch(fetchProductsRequest());

  return api
    .getProduct(product_id)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(product => reformatProducts(Array.of(product)))
    .then(product => dispatch(fetchProductsSuccess(product)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export const FindProducts = ({
  location_id,
  name,
  category,
  tag,
  additive,
}) => (dispatch, getState) => {
  dispatch(fetchProductsRequest());

  return api
    .findProduct({
      location_id,
      name,
      category,
      tag,
      additive,
    })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(products => reformatProducts(products))
    .then(products => dispatch(fetchProductsSuccess(products)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export const GetAllProducts = location_id => (dispatch, getState) => {
  dispatch(fetchProductsRequest());

  return api
    .findProduct({ location_id })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(products => reformatProducts(products))
    .then(products => dispatch(fetchProductsSuccess(products)))
    .catch(error => dispatch(fetchProductsFailure(error)));
};

export const GreateProduct = product => (dispatch, getState) => {
  dispatch(createProductRequest());

  const { session_key, user_id } = getState().authentication;

  const { location_id } = product;

  const data = {
    session_key,
    user_id,
    product,
  };

  if (__DEV__) {
    console.log(data);
  }

  return api
    .createProduct(data)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(product => reformatProducts(Array.of(product)))
    .then(product => dispatch(createProductSuccess(product)))
    .then(() => dispatch(push(`/locations/${location_id}`)))
    .catch(error => dispatch(createProductFailure(error)));
};

export const EditProduct = (product_id, product) => (dispatch, getState) => {
  dispatch(editProductRequest());

  const { session_key, user_id } = getState().authentication;

  const { location_id } = product;

  const data = {
    session_key,
    user_id,
    product_id,
    product,
  };

  if (__DEV__) {
    console.log(data);
  }

  return api
    .editProduct(data)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(location => reformatProducts(Array.of(location)))
    .then(location => dispatch(editProductSuccess(location)))
    .then(() => dispatch(push(`/locations/${location_id}`)))
    .catch(error => dispatch(editProductFailure(error)));
};

export default products;
