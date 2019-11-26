const ENV = {
  development: {
    API_URL: 'localhost',
  },
  production: {
    API_URL: 'ordered.online',
  },
};

export const API_URL = () => {
  // __DEV__ is true when run locally in Dev mode, but false when published.
  if (__DEV__) {
    return process.env.API_URL || ENV.development;
  } else {
    return process.env.API_URL || ENV.production;
  }
};
