const ENDPOINT_REGISTER = '/verification/register/';
const ENDPOINT_VERIFICATION = '/verification/verify/';
const ENDPOINT_LOGIN = '/verification/login/';
const ENDPOINT_LOGOUT = '/verification/logout/';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost'
    : process.env.API_URL;

export const registerUser = credentials => {
  const url = API_URL + ENDPOINT_REGISTER;
  console.log(API_URL);
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(credentials),
  }).then(response => response.json());
};

export const verifyUser = (sessionKey, userId) => {
  const url = API_URL + ENDPOINT_VERIFICATION;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({ sessionKey, userId }),
  }).then(response => response.json());
};

export const loginUser = (username, password) => {
  const url = API_URL + ENDPOINT_LOGIN;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({ username, password }),
  }).then(response => response.json());
};

export const logoutUser = (sessionKey, userId) => {
  const url = API_URL + ENDPOINT_LOGOUT;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({ sessionKey, userId }),
  }).then(response => response.json());
};
