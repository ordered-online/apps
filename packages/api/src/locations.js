import * as qs from 'qs';
import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_LOCATION = '/locations/create/';
const ENDPOINT_EDIT_LOCATION = '/locations/edit/';
const ENDPOINT_GET_LOCATION = '/locations/get/';
const ENDPOINT_FIND_LOCATION = '/locations/find/';
const ENDPOINT_NEARBY_LOCATION = '/locations/nearby/';
const GEOCODE_URL = 'https://nominatim.openstreetmap.org/search';

export const createLocation = data => {
  const url = API_URL + ENDPOINT_CREATE_LOCATION;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const editLocation = (location_id, data) => {
  const url = API_URL + ENDPOINT_EDIT_LOCATION + location_id;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getLocation = location_id => {
  const url = API_URL + ENDPOINT_GET_LOCATION + location_id;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const findLocation = query => {
  const url =
    API_URL +
    ENDPOINT_FIND_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getNearbyLocation = query => {
  const url =
    API_URL +
    ENDPOINT_NEARBY_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
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

  const url = GEOCODE_URL + qs.stringify(query, { addQueryPrefix: true });

  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json);
};
