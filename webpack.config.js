const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      use: [
        "babel-loader"
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MaxMeng',
      template: 'public/index.html'
    })
  ]
}
