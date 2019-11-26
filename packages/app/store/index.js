import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux'; // redux parts needed for a store
import { createLogger } from 'redux-logger'; // logger for redux
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'; // library to handle async with redux
import rootReducer from './reducers';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['authentication'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  middleware.push(createLogger());
}

// Redux: Store
const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware), ...enhancers)
);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export { store, persistor };
