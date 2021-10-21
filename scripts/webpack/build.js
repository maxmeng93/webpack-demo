const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { merge } = require('webpack-merge');
const common = require('./common');

module.exports = (env, argv) => {
  const analyz = env.analyz;
  const plugins = [];
  if (analyz) plugins.push(new BundleAnalyzerPlugin());

  return merge(common(env, argv), {
    mode: 'production',
    // 外部扩展。从输出的 bundle 中排除某些依赖
    externals: {
      //
    },
    optimization: {
      // 压缩代码
      minimize: true,
      // 启用标记。标记出模块导出值中哪些没有被用过
      usedExports: true,
      // 确定性id有益于长期缓存
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        },
      },
    },
    plugins: [
      ...plugins,
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].css",
      }),
    ]
  })
}
