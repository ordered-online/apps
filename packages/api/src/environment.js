export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:80'
    : process.env.API_URL;
