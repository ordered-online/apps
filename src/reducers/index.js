import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import cart from './cart';
import checkout from './checkout';
import payment from './payment';
import authentication from './authentication';

const rootReducer = combineReducers({
  cart,
  checkout,
  payment,
  authentication,
  router: routerReducer,
  form: formReducer,
});

export default rootReducer;
