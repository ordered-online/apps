import api from '@ordered.online/api';

// Action Types
export const CREATE_ORDER_REQUEST = 'ORDERS/CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'ORDERS/CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'ORDERS/CREATE_ORDER_FAILURE';

export const CLOSE_ORDER_REQUEST = 'ORDERS/CLOSE_ORDER_REQUEST';
export const CLOSE_ORDER_SUCCESS = 'ORDERS/CLOSE_ORDER_SUCCESS';
export const CLOSE_ORDER_FAILURE = 'ORDERS/CLOSE_ORDER_FAILURE';

export const FETCH_ORDER_REQUEST = 'ORDERS/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = 'ORDERS/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'ORDERS/FETCH_ORDER_FAILURE';

// Initial State
const initialState = {
  fetching: false,
  orders: {},
  error: null,
};

// Reducer (Modifies The State And Returns A New State)
const orders = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case CLOSE_ORDER_REQUEST:
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CREATE_ORDER_SUCCESS:
    case CLOSE_ORDER_SUCCESS:
    case FETCH_ORDER_SUCCESS:
      const { order } = action.payload;
      return {
        ...state,
        fetching: false,
        orders: { ...state.orders, ...action.payload },
      };

    case CREATE_ORDER_FAILURE:
    case CLOSE_ORDER_FAILURE:
    case FETCH_ORDER_FAILURE:
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
const createOrderRequest = () => ({
  type: CREATE_ORDER_REQUEST,
});

const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

const createOrderFailure = error => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

const closeOrderRequest = () => ({
  type: CLOSE_ORDER_REQUEST,
});

const closeOrderSuccess = order => ({
  type: CLOSE_ORDER_SUCCESS,
  payload: order,
});

const closeOrderFailure = error => ({
  type: CLOSE_ORDER_FAILURE,
  payload: error,
});

const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST,
});

const fetchOrderSuccess = orders => ({
  type: FETCH_ORDER_SUCCESS,
  payload: orders,
});

const fetchOrderFailure = error => ({
  type: FETCH_ORDER_FAILURE,
  payload: error,
});

/**
 * Take an array of orders from the REST API
 * and transform them into a object where
 * the key's are the orders session code's and the
 * value's are the order object's.
 *
 * @param {array} orders
 */
const reformatOrders = orders => {
  const initialValue = {};
  return orders.reduce((obj, item) => {
    return {
      ...obj,
      [item['code']]: item,
    };
  }, initialValue);
};

// Exports
export const CreateOrder = ({ location_id, name }) => (dispatch, getState) => {
  dispatch(createOrderRequest());

  const { session_key, user_id } = getState().authentication;

  if (__DEV__) {
    console.log({ user_id, session_key, location_id, name });
  }

  return api
    .createOrder({ user_id, session_key, location_id, name })
    .then(order => {
      if (__DEV__) {
        console.log(order);
      }
      return reformatOrders(Array.of(order));
    })
    .then(order => dispatch(createOrderSuccess(order)))
    .catch(error => dispatch(createOrderFailure(error)));
};

export const CloseOrder = ({ location_id, name, session_code }) => (
  dispatch,
  getState
) => {
  dispatch(closeOrderRequest());

  const { session_key, user_id } = getState().authentication;

  if (__DEV__) {
    console.log('session_code: ' + session_code);
  }

  return api
    .closeOrder(session_code)
    .then(order => {
      if (__DEV__) {
        console.log(order);
      }
      return reformatOrders(Array.of(order));
    })
    .then(order => dispatch(closeOrderSuccess(order)))
    .catch(error => dispatch(closeOrderFailure(error)));
};

export const GetOrders = ({ location_id, state }) => (dispatch, getState) => {
  dispatch(fetchOrderRequest());

  const { session_key, user_id } = getState().authentication;

  if (__DEV__) {
    console.log('location_id: ' + location_id);
    console.log('state: ' + state);
  }

  return api
    .findOrder({ location_id, state })
    .then(orders => {
      if (__DEV__) {
        console.log(orders);
      }
      return reformatOrders(orders);
    })
    .then(orders => dispatch(fetchOrderSuccess(orders)))
    .catch(error => dispatch(fetchOrderFailure(error)));
};

export default orders;
