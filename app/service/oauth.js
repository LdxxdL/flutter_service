'use strict';

const Service = require('egg').Service;
const uuid = require('uuid');
const moment = require('moment');

class OauthService extends Service {
  async getAccessToken(accessToken) {
    const accesstoken = await this.app.mysql.get('oauth_access_token', {
      accessToken,
      client: this.config.oauth.id,
    });
    return accesstoken;
  }

  async createToken(borrower) {
    const accessToken = {
      accessToken: uuid.v1(),
      accessTokenExpiresAt: moment().add(this.config.oauth.accessTokenLifetime, 's').format('YYYY-MM-DD'),
      client: this.config.oauth.id,
      // TODO 确定accessToken中具体保存什么内容
      user: JSON.stringify(borrower),
    };
    const refreshToken = {
      refreshToken: uuid.v1(),
      refreshTokenExpiresAt: moment().add(this.config.oauth.refreshTokenLifetime, 's').format('YYYY-MM-DD'),
      client: this.config.oauth.id,
      user: borrower.id,
    };
    const result = await Promise.all([
      this.app.mysql.insert('oauth_access_token', accessToken),
      this.app.mysql.insert('oauth_refresh_token', refreshToken),
    ]);
    if (result[0].affectedRows === 1 && result[1].affectedRows === 1) {
      return {
        accessToken: accessToken.accessToken,
        refreshToken: refreshToken.refreshToken,
      };
    }
    return null;
  }
}

module.exports = OauthService;
