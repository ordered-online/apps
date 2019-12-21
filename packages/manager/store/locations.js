import api from '@ordered.online/api';
import { push } from 'connected-react-router';

// Action Types
export const FETCH_LOCATION_REQUEST = 'LOCATION/FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_SUCCESS = 'LOCATION/FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'LOCATION/FETCH_LOCATION_FAILURE';

export const CREATE_LOCATION_REQUEST = 'LOCATION/CREATE_LOCATION_REQUEST';
export const CREATE_LOCATION_SUCCESS = 'LOCATION/CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'LOCATION/CREATE_LOCATION_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  locations: {},
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const locations = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
    case CREATE_LOCATION_REQUEST:
      return { ...state, fetching: true };

    case FETCH_LOCATION_SUCCESS:
    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        locations: { ...state.locations, ...action.payload },
      };

    case FETCH_LOCATION_FAILURE:
    case CREATE_LOCATION_FAILURE:
      return {
        ...state,
        fetching: false,
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

const fetchLocationSuccess = locations => ({
  type: FETCH_LOCATION_SUCCESS,
  payload: locations,
});

const fetchLocationFailure = error => ({
  type: FETCH_LOCATION_FAILURE,
  payload: error,
});

const createLocationRequest = () => ({
  type: CREATE_LOCATION_REQUEST,
});

const createLocationSuccess = location => ({
  type: CREATE_LOCATION_SUCCESS,
  payload: location,
});

const createLocationFailure = error => ({
  type: CREATE_LOCATION_FAILURE,
  payload: error,
});

/**
 * Take an array of locations from the REST API
 * and transform them into a object where
 * the key is the location id and the
 * value ist the location object
 *
 * @param {array} locations
 */
const reformatLocations = locations => {
  const initialValue = {};
  return locations.reduce((obj, item) => {
    return {
      ...obj,
      [item['id']]: item,
    };
  }, initialValue);
};

// Exports
export const GetLocation = locationId => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .getLocation(locationId)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
    })
    .then(location => reformatLocations(Array.of(location)))
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const GreateLocation = location => (dispatch, getState) => {
  dispatch(createLocationRequest());

  const { session_key, user_id } = getState().authentication;

  // see: https://github.com/ordered-online/locations#create-a-location-with-locationscreate
  const data = {
    session_key,
    user_id,
    location,
  };

  if (__DEV__) {
    console.log(data);
  }

  return api
    .createLocation(data)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(location => reformatLocations(Array.of(location)))
    .then(location => dispatch(createLocationSuccess(location)))
    .then(() => dispatch(push('/locations')))
    .catch(error =>
      error.resolve().then(error => dispatch(createLocationFailure(error)))
    );
};

export default locations;
