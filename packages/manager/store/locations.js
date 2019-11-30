import * as api from '@ordered.online/api';

// Action Types
export const FETCH_LOCATION_REQUEST = 'LOCATION/FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_SUCCESS = 'LOCATION/FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'LOCATION/FETCH_LOCATION_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  locations: {
    1: {
      id: 1,
      name: 'Studentencaf\u00e9 Ascii',
      description:
        'Gem\u00fctliches Caf\u00e9 in der Fak. Informatik der TU Dresden.',
      address: 'N\u00f6thnitzer Str. 46, 01187 Dresden',
      user_id: 1,
      latitude: '51.02508690',
      longitude: '13.72100050',
      website: null,
      telephone: null,
      categories: [
        {
          name: 'Cafe',
        },
      ],
      tags: [
        {
          name: 'calm',
        },
        {
          name: 'inexpensive',
        },
        {
          name: 'insider',
        },
      ],
    },
  },
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
    .then(location => reformatLocations(Array.of(location)))
    .then(location => dispatch(fetchLocationSuccess(location)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocation = query => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .findLocation(query)
    .then(locations => reformatLocations(locations))
    .then(locations => dispatch(fetchLocationSuccess(locations)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export const FindLocationNearby = query => (dispatch, getState) => {
  dispatch(fetchLocationRequest());

  return api
    .getNearbyLocation(query)
    .then(locations =>
      reformatLocations(
        Array.from(locations, obj =>
          Object.defineProperty(obj.location, distance, obj.distance)
        )
      )
    )
    .then(locations => dispatch(fetchLocationSuccess(locations)))
    .catch(error => dispatch(fetchLocationFailure(error)));
};

export default locations;
