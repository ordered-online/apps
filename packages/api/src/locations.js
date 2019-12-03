import * as qs from 'qs';

const ENDPOINT_CREATE_LOCATION = '/locations/create/';
const ENDPOINT_EDIT_LOCATION = '/locations/edit/';
const ENDPOINT_GET_LOCATION = '/locations/get/';
const ENDPOINT_FIND_LOCATION = '/locations/find/';
const ENDPOINT_NEARBY_LOCATION = '/locations/nearby/';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost'
    : process.env.API_URL;

export const createLocation = data => {
  const url = API_URL + ENDPOINT_CREATE_LOCATION;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const editLocation = (locationId, data) => {
  const url = API_URL + ENDPOINT_EDIT_LOCATION + locationId;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const getLocation = locationId => {
  const url = API_URL + ENDPOINT_GET_LOCATION + locationId;
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};

export const findLocation = query => {
  const url =
    API_URL +
    ENDPOINT_FIND_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};

export const getNearbyLocation = query => {
  const url =
    API_URL +
    ENDPOINT_NEARBY_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};
