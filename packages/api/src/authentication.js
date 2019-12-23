import { API_URL } from './environment';
import { status, json, resolveError } from './responseHandler';

const ENDPOINT_REGISTER = '/verification/register/';
const ENDPOINT_VERIFICATION = '/verification/verify/';
const ENDPOINT_LOGIN = '/verification/login/';
const ENDPOINT_LOGOUT = '/verification/logout/';

export const registerUser = credentials => {
  const url = API_URL + ENDPOINT_REGISTER;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(credentials),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const verifyUser = (session_key, user_id) => {
  const url = API_URL + ENDPOINT_VERIFICATION;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ session_key, user_id }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const loginUser = (username, password) => {
  const url = API_URL + ENDPOINT_LOGIN;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ username, password }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};

export const logoutUser = (session_key, user_id) => {
  const url = API_URL + ENDPOINT_LOGOUT;
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify({ session_key, user_id }),
  })
    .then(status)
    .then(json)
    .catch(resolveError);
};
