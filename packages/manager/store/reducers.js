import { combineReducers } from 'redux';

import authentication from './authentication';
import cart from './cart';
import categories from './categories';
import checkout from './checkout';
import locations from './locations';
import payment from './payment';
import products from './products';

const rootReducer = combineReducers({
  authentication,
  cart,
  categories,
  checkout,
  locations,
  payment,
  products,
});

export default rootReducer;
