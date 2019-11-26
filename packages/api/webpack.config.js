var path = require('path');

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
};
