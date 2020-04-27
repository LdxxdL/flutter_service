'use strict';

exports.logger = {
  consoleLevel: 'DEBUG',
};

exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    database: 'flutter',
    user: 'root',
    password: 'mysqlpwd',
  },
  url: 'mysql://root:mysqlpwd@localhost:3306/flutter',
};
