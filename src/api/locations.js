import { API_URL } from '../../environment';
const ENDPOINT_CREATE_LOCATION = '/locations/create/';
const ENDPOINT_EDIT_LOCATION = '/locations/edit/';
const ENDPOINT_GET_LOCATION = '/locations/get/';
const ENDPOINT_FIND_LOCATION = '/locations/find/';
const ENDPOINT_NEARBY_LOCATION = '/locations/nearby/';

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
  const url = API_URL + ENDPOINT_FIND_LOCATION + query;
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};

export const getNearbyLocation = query => {
  const url = API_URL + ENDPOINT_NEARBY_LOCATION + query;
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};
