const { merge } = require('webpack-merge');
const commonConfig = require('./scripts/webpack/common');
const serve = require('./scripts/webpack/serve');
const build = require('./scripts/webpack/build');

module.exports = (env, argv) => {
  const common = commonConfig(env, argv);

  if (env.serve || env.WEBPACK_SERVE) {
    return merge(common, serve);
  } else if (env.build) {
    return merge(common, build);
  }
};
