import * as qs from 'qs';
import { API_URL } from './environment';
const ENDPOINT_CREATE_LOCATION = '/locations/create/';
const ENDPOINT_EDIT_LOCATION = '/locations/edit/';
const ENDPOINT_GET_LOCATION = '/locations/get/';
const ENDPOINT_FIND_LOCATION = '/locations/find/';
const ENDPOINT_NEARBY_LOCATION = '/locations/nearby/';

export const createLocation = data => {
  const url = API_URL + ENDPOINT_CREATE_LOCATION;
  return fetch(url, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const editLocation = (location_id, data) => {
  const url = API_URL + ENDPOINT_EDIT_LOCATION + location_id;
  return fetch(url, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const getLocation = location_id => {
  const url = API_URL + ENDPOINT_GET_LOCATION + location_id;
  return fetch(url, {
    method: 'post',
    credentials: 'include',
  }).then(response => response.json());
};

export const findLocation = query => {
  const url =
    API_URL +
    ENDPOINT_FIND_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
    credentials: 'include',
  }).then(response => response.json());
};

export const getNearbyLocation = query => {
  const url =
    API_URL +
    ENDPOINT_NEARBY_LOCATION +
    qs.stringify(query, { addQueryPrefix: true });
  return fetch(url, {
    method: 'post',
    credentials: 'include',
  }).then(response => response.json());
};
