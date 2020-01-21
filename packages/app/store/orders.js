import api from '@ordered.online/api';
import { sessionConnect, sessionDisconnect } from './websocket';

// Action Types
export const CLOSE_SESSION_REQUEST = 'ORDERS/CLOSE_SESSION_REQUEST';
export const CLOSE_SESSION_SUCCESS = 'ORDERS/CLOSE_SESSION_SUCCESS';
export const CLOSE_SESSION_FAILURE = 'ORDERS/CLOSE_SESSION_FAILURE';

export const FETCH_SESSION_REQUEST = 'ORDERS/FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'ORDERS/FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILURE = 'ORDERS/FETCH_SESSION_FAILURE';

export const ORDER_PRODUCT_REQUEST = 'ORDERS/ORDER_PRODUCT_REQUEST';
export const ORDER_PRODUCT_SUCCESS = 'ORDERS/ORDER_PRODUCT_SUCCESS';
export const ORDER_PRODUCT_FAILURE = 'ORDERS/ORDER_PRODUCT_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  connecting: false,
  session: {},
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const orders = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SESSION_REQUEST:
    case FETCH_SESSION_REQUEST:
    case ORDER_PRODUCT_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CLOSE_SESSION_SUCCESS:
    case FETCH_SESSION_SUCCESS:
    case ORDER_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        session: { ...state.session, ...action.payload },
      };

    case CLOSE_SESSION_FAILURE:
    case FETCH_SESSION_FAILURE:
    case ORDER_PRODUCT_FAILURE:
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

const fetchSessionSuccess = session => ({
  type: FETCH_SESSION_SUCCESS,
  payload: session,
});

const fetchSessionFailure = error => ({
  type: FETCH_SESSION_FAILURE,
  payload: error,
});

const orderProductRequest = () => ({
  type: ORDER_PRODUCT_REQUEST,
});

const orderProductSuccess = session => ({
  type: ORDER_PRODUCT_SUCCESS,
  payload: session,
});

const orderProductFailure = error => ({
  type: ORDER_PRODUCT_FAILURE,
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
const reformatSessions = sessions => {
  const initialValue = {};
  return sessions.reduce((obj, item) => {
    return {
      ...obj,
      [item['code']]: item,
    };
  }, initialValue);
};

// Exports
export const CloseSession = ({ location_id, name, session_code }) => (
  dispatch,
  getState
) => {
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

export const GetSession = session_code => (dispatch, getState) => {
  dispatch(fetchSessionRequest());

  if (__DEV__) {
    console.log('session_code: ' + session_code);
  }

  return api
    .getSession(session_code)
    .then(session => {
      if (__DEV__) {
        console.log(session);
      }
      return reformatSessions(Array.of(session));
    })
    .then(session => dispatch(fetchSessionSuccess(session)))
    .catch(error => dispatch(fetchSessionFailure(error)));
};

export const OrderProduct = ({ product_id }) => (dispatch, getState) => {
  dispatch(orderProductRequest());

  const session_code = getState().orders.session.code;

  if (__DEV__) {
    console.log('session_code: ' + session_code);
    console.log('product_id: ' + product_id);
  }

  return api
    .orderProduct({ product_id, session_code })
    .then(session => {
      if (__DEV__) {
        console.log(session);
      }
      return reformatSessions(Array.of(session));
    })
    .then(session => dispatch(orderProductSuccess(session)))
    .catch(error => dispatch(orderProductFailure(error)));
};

export const ConnectSession = session_code => (dispatch, getState) => {
  const host = api.getSessionWebsocket(session_code);
  dispatch(sessionConnect(host));
};

export const DisconnectSession = () => (dispatch, getState) => {
  dispatch(sessionDisconnect());
};

export default orders;
