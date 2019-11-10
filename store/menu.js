import api from '../api';

// Action Types
export const FETCH_MENU_REQUEST = 'MENU/FETCH_MENU_REQUEST';
export const FETCH_MENU_SUCCESS = 'MENU/FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'MENU/FETCH_MENU_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  menu: null,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const menu = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENU_REQUEST:
      return { ...state, fetching: true };

    case FETCH_MENU_SUCCESS:
      return {
        ...state,
        fetching: false,
        menu: action.payload,
      };

    case FETCH_MENU_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

// Actions
const fetchMenuRequest = () => ({
  type: FETCH_MENU_REQUEST,
});

const fetchMenuSuccess = menu => ({
  type: FETCH_MENU_SUCCESS,
  payload: menu,
});

const fetchMenuFailure = error => ({
  type: FETCH_MENU_FAILURE,
  payload: error,
});

// Exports
export const GetMenu = locationId => (dispatch, getState) => {
  dispatch(fetchMenuRequest());
  dispatch(fetchMenuFailure('This service is currently unavailable'));

  // FIXME: currently there is not endpoint to fetch all available categories
  // return api
  //   .GetMenu(locationId)
  //   .then(menu => dispatch(fetchMenuSuccess(menu)))
  //   .catch(error => dispatch(fetchMenuFailure(error)));
};

export default menu;
