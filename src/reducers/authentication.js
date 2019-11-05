import api from '../api';

// Action Types
const LOGIN_REQUEST = 'AUTHENTICATION/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'AUTHENTICATION/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'AUTHENTICATION/LOGIN_FAILURE';
const REGISTER_REQUEST = 'AUTHENTICATION/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'AUTHENTICATION/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'AUTHENTICATION/REGISTER_FAILURE';
const LOGOUT_REQUEST = 'AUTHENTICATION/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'AUTHENTICATION/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'AUTHENTICATION/LOGOUT_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  loggedIn: false,
  userId: null,
  sessionKey: null,
  error: null,
};

// Reducers (Modifies The State And Returns A New State)
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      const { sessionKey, userId } = action.payload;
      return {
        fetching: false,
        loggedIn: true,
        userId,
        sessionKey,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    // Default
    default:
      return state;
  }
};

// Actions
const loginRequest = state => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (sessionKey, userId) => ({
  type: LOGIN_SUCCESS,
  payload: { sessionKey, userId },
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (sessionKey, userId) => ({
  type: REGISTER_SUCCESS,
  payload: { sessionKey, userId },
});

const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: error,
});

const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

// Exports
export const Login = (username, password) => (dispatch, getState) => {
  dispatch(loginRequest());

  return api
    .loginUser(username, password)
    .then(response => {
      if (response.error) {
        throw response.error;
      }
      const { sessionKey, userId } = response;
      dispatch(loginSuccess(sessionKey, userId));
    })
    .catch(error => dispatch(loginFailure(error)));
};

export const Register = credentials => (dispatch, getState) => {
  dispatch(registerRequest());

  return api
    .registerUser(credentials)
    .then(response => {
      if (response.error) {
        throw response.error;
      }
      const { sessionKey, userId } = response;
      dispatch(registerSuccess(sessionKey, userId));
    })
    .catch(error => dispatch(registerFailure(error)));
};

export const Logout = () => (dispatch, getState) => {
  dispatch(logoutRequest());
  const { sessionKey, userId } = getState().authentication;
  return api
    .logoutUser(sessionKey, userId)
    .then(() => dispatch(logoutSuccess()))
    .catch(error => dispatch(logoutFailure(error)));
};

export default authentication;
