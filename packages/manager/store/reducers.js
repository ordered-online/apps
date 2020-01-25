import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authentication from './authentication';
import locations from './locations';
import orders from './orders';
import products from './products';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authentication,
    locations,
    orders,
    products,
  });

export default createRootReducer;
