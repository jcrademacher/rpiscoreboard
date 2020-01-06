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
    rules: [
      {
        test: /\.css$/i,
        exclude: /(node_modules|resources)/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /(node_modules|resources)/
      }
    ]
  },
};
