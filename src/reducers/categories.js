export const FETCH_CATEGORIES_START = 'CATEGORIES/FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_END = 'CATEGORIES/FETCH_CATEGORIES_END';

const initialState = {
  fetching: false,
  categories: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return { ...state, fetching: true };

    case FETCH_CATEGORIES_END:
      return {
        ...state,
        fetching: false,
        categories: action.payload,
      };

    default:
      return { ...state, fetching: false };
  }
};

export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START,
});

export const fetchCategoriesEnd = categories => ({
  type: FETCH_CATEGORIES_END,
  payload: categories,
});

export const GetCategories = () => (dispatch, getState, api) => {
  dispatch(fetchCategoriesStart());

  return api
    .GetCategories()
    .then(categories => dispatch(fetchCategoriesEnd(categories)));
};
