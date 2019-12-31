var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
		main: './src/static/main.js'
	},
  output: { path: path.resolve(__dirname, "./build/"), filename: '[name].bundle.js' },
  // externals: {
  //   'settings': require("./build/settings.json")
  // },
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
