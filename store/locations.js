import api from '../api';

// Action Types
export const FETCH_LOCATION_REQUEST = 'LOCATION/FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_SUCCESS = 'LOCATION/FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'LOCATION/FETCH_LOCATION_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  location: null,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const locations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return { ...state, fetching: true };

    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        location: action.payload,
      };

    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

// Actions
const fetchLocationRequest = () => ({
  type: FETCH_LOCATION_REQUEST,
});

const fetchLocationSuccess = location => ({
  type: FETCH_LOCATION_SUCCESS,
  payload: location,
});

const fetchLocationFailure = error => ({
  type: FETCH_LOCATION_FAILURE,
  payload: error,
});

// Exports
export const GetLocation = locationId => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .getLocation(locationId)
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocation = query => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .findLocation(query)
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocationNearby = query => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .getNearbyLocation(query)
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export default locations;