const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      filename: 'build.js',
      path: path.join(__dirname, '/dist')},
    module: {
      rules: [   
        {
            loader: 'babel-loader',
            test: '/\.js$/',
            exclude: /node_modules/,
        }
      ],
    },
  
  };

//   {
//     test: /\.worker\.(c|m)?js$/i,
//     loader: "worker-loader",
//     options: {
//       esModule: false,
//     },
//   },