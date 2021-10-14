const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = 8080;

module.exports = function (env, argv) {
  const DEV = env.WEBPACK_SERVE;

  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      publicPath: '/',
      chunkFilename: 'js/[name].js'
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
    },
    stats: 'errors-only',
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      host: '0.0.0.0',
      port: PORT,
      hot: true,
    },
    // 外部扩展。从输出的 bundle 中排除某些依赖
    externals: {
      //
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
            // MiniCssExtractPlugin.loader,
            'style-loader',
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
      // 构建时使用，开发时不能用
      // new CleanWebpackPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: "[name].[hash].css",
      //   chunkFilename: "[id].css",
      // }),
      new HtmlWebpackPlugin({
        title: 'MaxMeng',
        template: 'public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ]
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:${PORT}`],
          notes: []
        },
        additionalFormatters: [],
        additionalTransformers: []
      }),
      // 打包分析
      // new BundleAnalyzerPlugin(),
    ]
  }
}
