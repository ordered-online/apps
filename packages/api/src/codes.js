import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_CREATE_CODE = '/codes/new/';
const ENDPOINT_RENDER_CODE_QR = '/codes/render/qr/';

export const createCode = () => {
  const url = API_URL + ENDPOINT_CREATE_CODE;
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const getQRCodeBase64 = value => {
  const url = API_URL + ENDPOINT_RENDER_CODE_QR;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ value }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};
