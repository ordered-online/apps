import { combineReducers } from 'redux';

import categories from './categories';
import checkout from './checkout';
import locations from './locations';
import orders from './orders';
import payment from './payment';
import products from './products';

const createRootReducer = history =>
  combineReducers({
    categories,
    checkout,
    locations,
    orders,
    payment,
    products,
  });

export default createRootReducer;
