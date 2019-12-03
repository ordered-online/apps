const createBaseConfig = require('../../webpack.config');

module.exports = async function(env, argv) {
  const config = await createBaseConfig(env, argv);
  return config;
};
