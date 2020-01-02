import * as authentication from './authentication';
import * as codes from './codes';
import * as locations from './locations';
import * as orders from './orders';
import * as products from './products';

export default {
  ...authentication,
  ...codes,
  ...locations,
  ...orders,
  ...products,
};
