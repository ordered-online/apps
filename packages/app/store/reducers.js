import { combineReducers } from 'redux';

import locations from './locations';
import orders from './orders';
import products from './products';

const createRootReducer = history =>
  combineReducers({
    locations,
    orders,
    products,
  });

export default createRootReducer;
