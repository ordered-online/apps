import * as api from '@ordered.online/api';

// Action Types
export const FETCH_CATEGORIES_REQUEST = 'CATEGORIES/FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'CATEGORIES/FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'CATEGORIES/FETCH_CATEGORIES_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  categories: [
    {
      name: 'Drink',
    },
  ],
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const categories = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, fetching: true };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        categories: action.payload,
      };

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

// Actions

// Exports
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const GetCategories = () => (dispatch, getState) => {
  dispatch(fetchCategoriesRequest());
  dispatch(fetchCategoriesFailure('This service is currently unavailable'));

  // FIXME: currently there is not endpoint to fetch all available categories
  // return api
  //   .GetCategories()
  //   .then(categories => dispatch(fetchCategoriesSuccess(categories)))
  //   .catch(error => dispatch(fetchCategoriesFailure(error)));
};

export default categories;
