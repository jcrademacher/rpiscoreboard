var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
		main: './src/js/main.js',
		account: './src/js/account.js'
	},
  output: { path: "./src/pages", filename: '[name].bundle.js' },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|resources)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
