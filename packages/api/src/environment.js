const ENV = {
  development: {
    API_URL: process.env.API_URL || 'localhost',
  },
  production: {
    API_URL: process.env.API_URL || 'ordered.online',
  },
};

export const getEnvironment = () => {
  if (process.env.NODE_ENV === 'development') {
    return ENV.development;
  } else {
    return ENV.production;
  }
};
