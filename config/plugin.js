'use strict';

exports.security = false;

exports.session = false; // 关闭session

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
