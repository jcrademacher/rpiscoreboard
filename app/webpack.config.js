var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
		main: './src/static/main.js'
	},
  output: { path: path.resolve(__dirname, "./build/"), filename: 'main.bundle.js' },
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
