import * as qs from 'qs';
import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_ORDER = '/orders/sessions/create/';
const ENDPOINT_GET_ORDER = session_code =>
  `/orders/sessions/get/${session_code}/`;
const ENDPOINT_CLOSE_ORDER = session_code =>
  `/orders/sessions/close/${session_code}/`;
const ENDPOINT_FIND_ORDER = '/orders/sessions/find/';
const ENDPOINT_ADD_PRODUCT_TO_ORDER = '/orders/products/add/';

export const createOrder = ({ user_id, session_key, location_id, name }) => {
  const url = API_URL + ENDPOINT_CREATE_ORDER;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, location_id, name }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getOrder = session_code => {
  const url = API_URL + ENDPOINT_GET_ORDER(session_code);
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const closeOrder = session_code => {
  const url = API_URL + ENDPOINT_CLOSE_ORDER(session_code);
  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const findOrder = ({ location_id, state }) => {
  const url =
    API_URL +
    ENDPOINT_FIND_ORDER +
    qs.stringify({ location_id, state }, { addQueryPrefix: true });
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const addProductToOrder = ({ product_id, session_code }) => {
  const url = API_URL + ENDPOINT_ADD_PRODUCT_TO_ORDER;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ product_id, session_code }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};
