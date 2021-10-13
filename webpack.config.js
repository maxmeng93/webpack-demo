const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

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
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [
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
                limit: 2048,
              }
            },
            'file-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        },
      ]
    },
    plugins: [
      new EslintWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      // 构建时使用，开发时不能用
      // new CleanWebpackPlugin(),
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
    ]
  }
}
