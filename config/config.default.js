/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: '*',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587608023623_9552';

  // add your middleware config here
  config.middleware = [];

  config.oauth = {
    id: 'flutter',
    secret: '1548149734593_1604',
    accessTokenLifetime: 3600,
    refreshTokenLifetime: 1209600,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
