const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
require('dotenv').config();

const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

module.exports = withPlugins([
  [withCss, {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style\/css.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        });
      }
      // https://github.com/akiran/react-slick/issues/842#issuecomment-385378629
      // Do compatible with react-slick
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]'
          }
        }
      });
      return config;
    },
  }],
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[path]___[local]___[hash:base64:5]',
    },
    [PHASE_PRODUCTION_BUILD]: {
      cssLoaderOptions: {
        localIdentName: '[hash:base64:8]',
      },
    },
  }],
], {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    DEFAULT_AVATAR_URL: process.env.DEFAULT_AVATAR_URL,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID
  }
});