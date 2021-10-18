const path = require('path');
const webpack = require('webpack');

const rootPath = '../../';
const PORT = 8080;

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, rootPath, 'public'),
    },
    compress: true,
    host: '0.0.0.0',
    port: PORT,
    hot: true,
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ]
}
