import api from '@ordered.online/api';

import {
  sessionConnect,
  sessionDisconnect,
  SESSION_MESSAGE,
} from './websocket';

// Action Types
export const CREATE_SESSION_REQUEST = 'ORDERS/CREATE_SESSION_REQUEST';
export const CREATE_SESSION_SUCCESS = 'ORDERS/CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_FAILURE = 'ORDERS/CREATE_SESSION_FAILURE';

export const CLOSE_SESSION_REQUEST = 'ORDERS/CLOSE_SESSION_REQUEST';
export const CLOSE_SESSION_SUCCESS = 'ORDERS/CLOSE_SESSION_SUCCESS';
export const CLOSE_SESSION_FAILURE = 'ORDERS/CLOSE_SESSION_FAILURE';

export const FETCH_SESSION_REQUEST = 'ORDERS/FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'ORDERS/FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILURE = 'ORDERS/FETCH_SESSION_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  sessions: {},
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const orders = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
    case CLOSE_SESSION_REQUEST:
    case FETCH_SESSION_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CREATE_SESSION_SUCCESS:
    case CLOSE_SESSION_SUCCESS:
    case FETCH_SESSION_SUCCESS:
    case SESSION_MESSAGE:
      return {
        ...state,
        fetching: false,
        sessions: { ...state.sessions, ...action.payload },
      };

    case CREATE_SESSION_FAILURE:
    case CLOSE_SESSION_FAILURE:
    case FETCH_SESSION_FAILURE:
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
const createSessionRequest = () => ({
  type: CREATE_SESSION_REQUEST,
});

const createSessionSuccess = session => ({
  type: CREATE_SESSION_SUCCESS,
  payload: session,
});

const createSessionFailure = session => ({
  type: CREATE_SESSION_FAILURE,
  payload: session,
});

const closeSessionRequest = () => ({
  type: CLOSE_SESSION_REQUEST,
});

const closeSessionSuccess = session => ({
  type: CLOSE_SESSION_SUCCESS,
  payload: session,
});

const closeSessionFailure = session => ({
  type: CLOSE_SESSION_FAILURE,
  payload: session,
});

const fetchSessionRequest = () => ({
  type: FETCH_SESSION_REQUEST,
});

const fetchSessionSuccess = sessions => ({
  type: FETCH_SESSION_SUCCESS,
  payload: sessions,
});

const fetchSessionFailure = error => ({
  type: FETCH_SESSION_FAILURE,
  payload: error,
});

/**
 * Take an array of order sessions from the REST API
 * and transform them into a object where
 * the key's are the session code's and the
 * value's are the session object's.
 *
 * @param {array} session
 */
export const reformatSessions = sessions => {
  const initialValue = {};
  return sessions.reduce((obj, item) => {
    return {
      ...obj,
      [item['code']]: item,
    };
  }, initialValue);
};

export function validateSessionCode(code) {
  const regex = /^[a-z0-9]{40}$/i;
  return regex.test(code);
}

// Exports
export const CreateSession = ({ location_id, name }) => (
  dispatch,
  getState
) => {
  dispatch(createSessionRequest());

  const { session_key, user_id } = getState().authentication;

  if (__DEV__) {
    console.log({ user_id, session_key, location_id, name });
  }

  return api
    .createSession({ user_id, session_key, location_id, name })
    .then(session => {
      if (__DEV__) {
        console.log(session);
      }
      return reformatSessions(Array.of(session));
    })
    .then(session => dispatch(createSessionSuccess(session)))
    .catch(error => dispatch(createSessionFailure(error)));
};

export const CloseSession = ({ session_code }) => (dispatch, getState) => {
  if (!validateSessionCode(session_code)) {
    return;
  }
  dispatch(closeSessionRequest());

  if (__DEV__) {
    console.log('session_code: ' + session_code);
  }

  return api
    .closeSession(session_code)
    .then(session => {
      if (__DEV__) {
        console.log(session);
      }
      return reformatSessions(Array.of(session));
    })
    .then(session => dispatch(closeSessionSuccess(session)))
    .catch(error => dispatch(closeSessionFailure(error)));
};

export const GetSessions = ({ location_id, state }) => (dispatch, getState) => {
  dispatch(fetchSessionRequest());

  if (__DEV__) {
    console.log('location_id: ' + location_id);
    console.log('state: ' + state);
  }

  return api
    .findSession({ location_id, state })
    .then(sessions => {
      if (__DEV__) {
        console.log(sessions);
      }
      return reformatSessions(sessions);
    })
    .then(sessions => dispatch(fetchSessionSuccess(sessions)))
    .catch(error => dispatch(fetchSessionFailure(error)));
};

export const GetSession = session_code => (dispatch, getState) => {
  if (!validateSessionCode(session_code)) {
    return;
  }
  dispatch(fetchSessionRequest());

  if (__DEV__) {
    console.log('session_code: ' + session_code);
  }

  return api
    .getSession(session_code)
    .then(order => {
      if (__DEV__) {
        console.log(order);
      }
      return reformatSessions(Array.of(order));
    })
    .then(order => dispatch(fetchSessionSuccess(order)))
    .catch(error => dispatch(fetchSessionFailure(error)));
};

export const ConnectSession = session_code => (dispatch, getState) => {
  if (!validateSessionCode(session_code)) {
    return;
  }
  const host = api.getSessionWebsocketUrl(session_code);
  dispatch(sessionConnect(host));
};

export const DisconnectSession = () => (dispatch, getState) => {
  dispatch(sessionDisconnect());
};

export default orders;
