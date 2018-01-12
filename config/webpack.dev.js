const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = function () {
  return webpackMerge(commonConfig.define({ isProd: false, env: ENV }), {
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /<meta http-equiv="Content-Security-Policy".+\/>/g,
                replacement: function () {
                  return '';
                }
              }
            ]
          })
        },
      ]
    }
  });
};
