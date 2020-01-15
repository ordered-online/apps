import api from '@ordered.online/api';

// Action Types
export const FETCH_LOCATION_REQUEST = 'LOCATION/FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_SUCCESS = 'LOCATION/FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'LOCATION/FETCH_LOCATION_FAILURE';

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
      return { ...state, fetching: true };

    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        locations: { ...state.locations, ...action.payload },
      };

    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    default:
      return state;
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

/**
 * Take an array of locations from the REST API
 * and transform them into a object where
 * the key's are the location id's and the
 * value's are the location object's.
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
export const GetLocation = location_id => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .getLocation(location_id)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(location => reformatLocations(Array.of(location)))
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const GetAllLocations = () => (dispatch, getState) => {
  const { user_id } = getState().authentication;

  dispatch(fetchLocationRequest());

  return api
    .findLocation({ user_id })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(locations => reformatLocations(locations))
    .then(locations => dispatch(fetchLocationSuccess(locations)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocations = ({ user_id, name, category, tag }) => (
  dispatch,
  getState
) => {
  dispatch(fetchLocationRequest());

  return api
    .findLocation({ user_id, name, category, tag })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(locations => reformatLocations(locations))
    .then(locations => dispatch(fetchLocationSuccess(locations)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocationsNearby = ({ longitude, latitude, radius }) => (
  dispatch,
  getState
) => {
  dispatch(fetchLocationRequest());

  return api
    .getNearbyLocation({ longitude, latitude, radius })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      return response;
    })
    .then(locations => reformatLocations(locations))
    .then(locations => dispatch(fetchLocationSuccess(locations)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export default locations;
