export const FETCH_PRODUCTS_START = 'PRODUCTS/FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_END = 'PRODUCTS/FETCH_PRODUCTS_END';

const initialState = {
  fetching: false,
  products: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return { ...state, fetching: true };

    case FETCH_PRODUCTS_END:
      return {
        ...state,
        fetching: false,
        products: action.payload,
      };

    default:
      return { ...state, fetching: false };
  }
};

export const fetchProductsStart = () => ({
  type: FETCH_PRODUCTS_START,
});

export const fetchProductsEnd = products => ({
  type: FETCH_PRODUCTS_END,
  payload: products,
});

export const GetProducts = resources => (dispatch, getState, api) => {
  dispatch(fetchProductsStart());

  return api
    .GetProducts(resources)
    .then(products => dispatch(fetchProductsEnd(products)));
};
