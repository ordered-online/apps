const webpack = require('webpack');
const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const includePackages = ['@ordered.online/components'];

function packageNameFromPath(inputPath) {
  const modules = inputPath.split('node_modules/');
  const libAndFile = modules.pop();
  if (!libAndFile) return null;
  if (libAndFile.charAt(0) === '@') {
    const [org, lib] = libAndFile.split('/');
    return org + '/' + lib;
  } else {
    const components = libAndFile.split('/');
    const first = components.shift();
    return first || null;
  }
}

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.forEach(rule => {
    if (!Reflect.has(rule, 'oneOf')) {
      return false;
    }

    rule.oneOf.forEach(loader => {
      if (!Reflect.has(loader, 'test')) {
        return false;
      }

      if (!loader.test.toString().includes('(mjs|[jt]sx?)')) {
        return false;
      }

      if (
        !loader.use.loader.includes('node_modules/babel-loader') &&
        !loader.loader.use
      ) {
        return false;
      }

      if (loader.use.loader.includes('node_modules/babel-loader')) {
        const includeFunc = loader.include;

        loader.include = inputPath => {
          const packageName = packageNameFromPath(inputPath);
          if (includePackages.includes(packageName)) {
            return true;
          }
          return includeFunc(inputPath);
        };
      }
    });
  });

  if (config.mode === 'development') {
    config.devServer.historyApiFallback = true;
  }

  config.plugins.forEach(plugin => {
    if (plugin.constructor.name === 'ExpoInterpolateHtmlPlugin') {
      plugin.replacements.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    }
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(
        process.env.GOOGLE_MAPS_API_KEY
      ),
    })
  );

  return config;
};
