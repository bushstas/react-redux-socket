let path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, "/node_modules/")],
        loader: "babel-loader",
        options: {
          presets: ["es2015", "es2017", "react"]
        }
      },
      {
        test: /\.jsx?$/,
        exclude: [path.resolve(__dirname, "/node_modules/")],
        loader: "react-hot-loader/webpack"
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};