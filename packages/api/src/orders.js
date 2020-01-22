import * as qs from 'qs';
import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_SESSION = '/orders/sessions/create/';
const ENDPOINT_GET_SESSION = session_code =>
  `/orders/sessions/get/${session_code}/`;
const ENDPOINT_CLOSE_SESSION = session_code =>
  `/orders/sessions/close/${session_code}/`;
const ENDPOINT_FIND_SESSION = '/orders/sessions/find/';
const ENDPOINT_ORDER_PRODUCT = '/orders/products/add/';

export const createSession = ({ user_id, session_key, location_id, name }) => {
  const url = API_URL + ENDPOINT_CREATE_SESSION;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, location_id, name }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getSession = session_code => {
  const url = API_URL + ENDPOINT_GET_SESSION(session_code);
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const closeSession = session_code => {
  const url = API_URL + ENDPOINT_CLOSE_SESSION(session_code);
  return fetch(url, {
    method: 'post',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const findSession = ({ location_id, state }) => {
  const url =
    API_URL +
    ENDPOINT_FIND_SESSION +
    qs.stringify({ location_id, state }, { addQueryPrefix: true });
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const orderProduct = ({ product_id, session_code }) => {
  const url = API_URL + ENDPOINT_ORDER_PRODUCT;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ product_id, session_code }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getSessionWebsocketUrl = session_code =>
  `ws://${process.env.API_URL}/ws/session/${session_code}/`;
