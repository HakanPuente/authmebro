/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require('path');
const withLess = require('@zeit/next-less');

require('dotenv').config();

const nextConfig = {
  webpack(config) {
    config.resolve.alias['../../theme.config$'] = path.join(
      __dirname,
      'src/semantic-ui/theme.config',
    );
    config.resolve.alias['../semantic-ui/site'] = path.join(
      __dirname,
      'src/semantic-ui/site',
    );
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
          esModule: false,
        },
      },
    });
    return config;
  },
};

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    VERSION: process.env.VERSION,
    GIT_COMMIT: process.env.GIT_COMMIT,
  },
  // assetPrefix: 'https://asdf.com/',
  ...withLess(nextConfig),
};
