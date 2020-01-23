const createBaseConfig = require('../../webpack.config');

module.exports = async function(env, argv) {
  const config = await createBaseConfig(env, argv);
  if (config.mode === 'production') {
    config.output.publicPath = '/manager/';
  }
  return config;
};
