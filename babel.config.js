module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    babelrcRoots: [
      // Keep the root as a root
      '.',
      // Also consider monorepo packages "root" and load their .babelrc files.
      './packages/*',
    ],
  };
};
