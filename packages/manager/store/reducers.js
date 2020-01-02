import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authentication from './authentication';
import cart from './cart';
import categories from './categories';
import checkout from './checkout';
import locations from './locations';
import orders from './orders';
import payment from './payment';
import products from './products';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authentication,
    cart,
    categories,
    checkout,
    locations,
    orders,
    payment,
    products,
  });

export default createRootReducer;
