const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const expoConfig = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  return expoConfig;
};
