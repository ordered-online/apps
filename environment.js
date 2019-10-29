const ENV = {
 development: {
   apiUrl: localhost,
 },
 production: {
   apiUrl: "ordered.online",
 }
};

const getEnvVars = () => {
 // __DEV__ is true when run locally in Dev mode, but false when published.
 if (__DEV__) {
   return ENV.development;
 } else {
   return ENV.production;
 }
};

export default getEnvVars;