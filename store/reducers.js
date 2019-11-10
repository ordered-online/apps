import { combineReducers } from 'redux';

import cart from './cart';
import checkout from './checkout';
import payment from './payment';
import authentication from './authentication';

const rootReducer = combineReducers({
  cart,
  checkout,
  payment,
  authentication,
});

export default rootReducer;
