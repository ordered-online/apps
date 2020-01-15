import api from '@ordered.online/api';

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
    .findProducts({
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
    .findProducts({ location_id })
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

export default products;
