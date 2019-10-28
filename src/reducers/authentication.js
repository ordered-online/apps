// Action Types
const LOGIN = 'AUTHENTICATION/LOGIN';
const REGISTER = 'AUTHENTICATION/REGISTER';
const LOGOUT = 'AUTHENTICATION/LOGOUT';
const LOADING = 'AUTHENTICATION/LOADING';
const ERROR = 'AUTHENTICATION/ERROR';

// Initial State
const initialState = {
  isLoading: false,
  loggedIn: false,
  userId: null,
  token: null,
  error: null,
};

// Reducers (Modifies The State And Returns A New State)
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN:
    case REGISTER:
      const { userId, token } = action.payload;
      return {
        isLoading: false,
        loggedIn: true,
        userId,
        token,
      };

    case LOGOUT:
      return initialState;

    // Default
    default: {
      return state;
    }
  }
};

// Actions
const setLoading = state => ({
  type: LOADING,
});

const setLogin = auth => ({
  type: LOGIN,
  payload: auth,
});

const setRegistration = auth => ({
  type: REGISTER,
  payload: auth,
});

const setLogout = auth => ({
  type: LOGOUT,
});

const setError = error => ({
  type: ERROR,
});

// Exports
export const Login = (username, password) => (dispatch, getState, api) => {
  dispatch(setLoading());

  return api
    .loginUser(username, password)
    .then(auth => dispatch(setLogin(auth)))
    .catch(error => dispatch(setError(error)));
};

export const Register = credentials => (dispatch, getState, api) => {
  dispatch(setLoading());

  return api
    .registerUser(credentials)
    .then(auth => dispatch(setRegistration(auth)))
    .catch(error => dispatch(setError(error)));
};

export const Logout = () => (dispatch, getState, api) => {
  dispatch(setLoading());

  return api
    .logoutUser(logoutUser)
    .then(() => dispatch(setLogout()))
    .catch(error => dispatch(setError(error)));
};

export default authentication;
