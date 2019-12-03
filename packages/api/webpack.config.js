const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname),
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '/lib'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'localhost'),
      REST_API_URL: JSON.stringify(process.env.API_URL || 'http://localhost'),
    }),
  ],
};
