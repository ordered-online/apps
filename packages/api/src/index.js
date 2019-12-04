import * as authentication from './authentication';
import * as locations from './locations';
import * as products from './products';

export default {
  ...authentication,
  ...locations,
  ...products,
};
