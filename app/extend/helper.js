'use strict';

const crypto = require('crypto');

module.exports = {
  md5: (content, key = '') => {
    const cyt = crypto.createHash('md5');
    cyt.update(content + key, 'UTF-8');
    return cyt.digest('hex');
  },
};
