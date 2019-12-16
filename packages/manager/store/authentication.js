import api from '@ordered.online/api';

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
  authenticated: false,
  user_id: null,
  session_key: null,
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
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
      const { session_key, user_id } = action.payload;
      return {
        ...state,
        fetching: false,
        authenticated: true,
        user_id,
        session_key,
      };

    case LOGOUT_SUCCESS:
      return initialState;

    case LOGOUT_FAILURE:
      return {
        ...initialState,
        error: action.payload,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
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
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (session_key, user_id) => ({
  type: LOGIN_SUCCESS,
  payload: { session_key, user_id },
});

const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (session_key, user_id) => ({
  type: REGISTER_SUCCESS,
  payload: { session_key, user_id },
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
export const Login = ({ username, password }) => (dispatch, getState) => {
  dispatch(loginRequest());

  if (__DEV__) {
    console.log('username: ' + username);
    console.log('password: ' + password);
  }

  return api
    .loginUser(username, password)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      const { session_key, session_data } = response;
      const { user_id } = session_data;
      dispatch(loginSuccess(session_key, user_id));
    })
    .catch(error => dispatch(loginFailure(error)));
};

export const Register = credentials => (dispatch, getState) => {
  dispatch(registerRequest());

  // These are the credentials needed for registration
  const { username, password, email, first_name, last_name } = credentials;

  return api
    .registerUser({ username, password, email, first_name, last_name })
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      const { session_key, session_data } = response;
      const { user_id } = session_data;
      dispatch(registerSuccess(session_key, user_id));
    })
    .catch(error => dispatch(registerFailure(error)));
};

export const Logout = () => (dispatch, getState) => {
  dispatch(logoutRequest());
  const { session_key, user_id } = getState().authentication;
  return api
    .logoutUser(session_key, user_id)
    .then(response => {
      if (__DEV__) {
        console.log(response);
      }
      dispatch(logoutSuccess());
    })
    .catch(error => dispatch(logoutFailure(error)));
};

export default authentication;
