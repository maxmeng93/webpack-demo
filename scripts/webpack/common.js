const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PORT = 8080;
const rootPath = '../../';

module.exports = function (env, argv) {
  const is_dev = env.serve || env.WEBPACK_SERVE;

  return {
    entry: path.join(__dirname, rootPath, 'src/index.ts'),
    output: {
      path: path.resolve(__dirname, rootPath, 'dist'),
      filename: 'js/[name].[contenthash].js',
      publicPath: '/',
      chunkFilename: 'js/[name].[contenthash].js'
    },
    stats: 'errors-only',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, rootPath, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            is_dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: 'images/[name].[hash:8].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new EslintWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        title: 'MaxMeng',
        template: path.resolve(__dirname, rootPath, 'public/index.html')
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, rootPath, 'public'),
            to: path.resolve(__dirname, rootPath, 'dist'),
            toType: 'dir',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ]
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:8080`],
          notes: []
        },
        additionalFormatters: [],
        additionalTransformers: []
      }),
    ]
  }
}
