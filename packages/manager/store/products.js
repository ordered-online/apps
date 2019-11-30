import * as api from '@ordered.online/api';

// Action Types
export const FETCH_PRODUCTS_REQUEST = 'PRODUCT/FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'PRODUCT/FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'PRODUCT/FETCH_PRODUCTS_FAILURE';

const initialState = {
  fetching: false,
  products: {
    1: {
      id: 1,
      location_id: 1,
      name: 'Coffee',
      description:
        'The elexir of computer scientists. 1 Euro deposit included for the cup.',
      price: '1.80',
      categories: [
        {
          name: 'Drink',
        },
      ],
      tags: [
        {
          name: 'stimulating',
        },
      ],
      additives: [
        {
          name: 'caffeine',
        },
      ],
    },
  },
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
