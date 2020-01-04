import * as qs from 'qs';
import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_PRODUCT = '/products/create/';
const ENDPOINT_EDIT_PRODUCT = product_id => `/products/edit/${product_id}/`;
const ENDPOINT_GET_PRODUCT = product_id => `/products/get/${product_id}/`;
const ENDPOINT_FIND_PRODUCT = '/products/find/';

export const createProduct = ({ user_id, session_key, product }) => {
  console.log({ user_id, session_key, product });
  const url = API_URL + ENDPOINT_CREATE_PRODUCT;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, product }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const editProduct = ({ user_id, session_key, product_id, product }) => {
  const url = API_URL + ENDPOINT_EDIT_PRODUCT(product_id);
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ user_id, session_key, product }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getProduct = product_id => {
  const url = API_URL + ENDPOINT_GET_PRODUCT(product_id);
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const findProducts = ({
  location_id,
  name,
  category,
  tag,
  additive,
}) => {
  const url =
    API_URL +
    ENDPOINT_FIND_PRODUCT +
    qs.stringify(
      {
        location_id,
        name,
        category,
        tag,
        additive,
      },
      { addQueryPrefix: true }
    );
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};
