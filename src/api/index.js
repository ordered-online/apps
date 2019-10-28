import {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
} from './authentification';
import {
  createLocation,
  editLocation,
  getLocation,
  findLocation,
  getNearbyLocation,
} from './locations';
import {
  createProduct,
  editProduct,
  getProduct,
  findProduct,
} from './products';

const api = {
  // Authentication
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  // Locations
  createLocation,
  editLocation,
  getLocation,
  findLocation,
  getNearbyLocation,
  // Products
  createProduct,
  editProduct,
  getProduct,
  findProduct,
};

export default api;
