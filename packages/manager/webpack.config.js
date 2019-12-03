const createExpoWebpackConfigAsync = require('@expo/webpack-config');
var path = require('path');

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
  const expoConfig = await createExpoWebpackConfigAsync(env, argv);

  expoConfig.module.rules.forEach(rule => {
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

  if (expoConfig.mode === 'development') {
    expoConfig.devServer.proxy = {
      '/**': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 80,
        },
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    };
  }

  return expoConfig;
};
