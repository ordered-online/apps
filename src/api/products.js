const ENDPOINT_CREATE_PRODUCT = '/products/create/';
const ENDPOINT_EDIT_PRODUCT = '/products/edit/';
const ENDPOINT_GET_PRODUCT = '/products/get/';
const ENDPOINT_FIND_PRODUCT = '/products/find/';

export const createProduct = data => {
  const url = API_URL + ENDPOINT_CREATE_PRODUCT;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const editProduct = (productId, data) => {
  const url = API_URL + ENDPOINT_EDIT_PRODUCT + productId;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const getProduct = productId => {
  const url = API_URL + ENDPOINT_GET_PRODUCT + productId;
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};

export const findProduct = query => {
  const url = API_URL + ENDPOINT_FIND_PRODUCT + query;
  return fetch(url, {
    method: 'post',
  }).then(response => response.json());
};
