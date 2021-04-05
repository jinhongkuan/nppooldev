const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  stats: {
    children: true
  },
  node: {
    global: true 
  },
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      chunkFilename: '[id].js',
      publicPath: ''},
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        'os': require.resolve('os-browserify/browser'),
        'http': require.resolve('stream-http'),
        'https': require.resolve('https-browserify'),
        "crypto": require.resolve("crypto-browserify"),
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "stream": require.resolve("stream-browserify"),
        "constants": require.resolve("constants-browserify")
      }
    },
    module: {
      rules: [   
        {
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader'}, 
            {
              loader: 'css-loader',
              options: {
                  modules: {
                      localIdentName: "[name]__[local]___[hash:base64:5]",
                  },														
                  sourceMap: true
              }
            },
            { 
              loader: 'postcss-loader',
              options: {
                 postcssOptions: {
                     plugins: [
                         [ 'autoprefixer', {}, ],
                     ],
                 },
             }
           }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[ext]'
          }
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                encoding: false,
              },
            },
          ],
        },
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + '/src/index.html',
          filename: 'index.html',
          inject: 'body'
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),

    ],

  };

//   {
//     test: /\.worker\.(c|m)?js$/i,
//     loader: "worker-loader",
//     options: {
//       esModule: false,
//     },
//   },