var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-3"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      //apiUrl: 'http://192.168.15.9:8080',
      apiUrl: "http://port-9997.smart-device-front-ingcram954121.codeanyapp.com"
    })
  }
};
