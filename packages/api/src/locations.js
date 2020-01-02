import * as qs from 'qs';
import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_LOCATION = '/locations/create/';
const ENDPOINT_EDIT_LOCATION = location_id => `/locations/edit/${location_id}/`;
const ENDPOINT_GET_LOCATION = location_id => `/locations/get/${location_id}/`;
const ENDPOINT_FIND_LOCATION = '/locations/find/';
const ENDPOINT_NEARBY_LOCATION = '/locations/nearby/';
const GEOCODE_URL = 'https://nominatim.openstreetmap.org/search';

export const createLocation = ({ user_id, session_key, location }) => {
  const url = API_URL + ENDPOINT_CREATE_LOCATION;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, location }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const editLocation = ({
  user_id,
  session_key,
  location_id,
  location,
}) => {
  const url = API_URL + ENDPOINT_EDIT_LOCATION(location_id);
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, location }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getLocation = location_id => {
  const url = API_URL + ENDPOINT_GET_LOCATION(location_id);
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const findLocation = ({ user_id, name, category, tag }) => {
  const url =
    API_URL +
    ENDPOINT_FIND_LOCATION +
    qs.stringify({ user_id, name, category, tag }, { addQueryPrefix: true });
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getNearbyLocation = ({ longitude, latitude, radius }) => {
  const url =
    API_URL +
    ENDPOINT_NEARBY_LOCATION +
    qs.stringify({ longitude, latitude, radius }, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const geocodeLocation = ({ address, postalcode, city }) => {
  const query = {
    q: address,
    postalcode,
    city,
    format: 'json',
  };

  console.log(query);

  const url = GEOCODE_URL + qs.stringify(query, { addQueryPrefix: true });

  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json);
};
