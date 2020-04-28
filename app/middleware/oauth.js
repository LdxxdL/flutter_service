'use strict';

const moment = require('moment');

async function authenticate(ctx, next) {
  const Authorization = ctx.get('Authorization');
  ctx.logger.debug(Authorization);
  if (Authorization) {
    const accessToken = Authorization.split(' ')[1] || '';
    ctx.logger.debug(accessToken);
    ctx.logger.debug(ctx.app.config.oauth.id);
    // TODO 内存中保存一份accessTokenInfo，先查找内存中的内容
    const accessTokenInfo = await ctx.app.mysql.get('oauth_access_token', {
      accessToken,
      client: ctx.app.config.oauth.id,
    });
    ctx.logger.debug(accessTokenInfo);
    if (accessTokenInfo && accessTokenInfo.accessTokenExpiresAt > moment().format('YYYY-MM-DD HH:mm:ss')) {
      ctx.state.borrower = JSON.parse(accessTokenInfo.user);
      await next();
    } else {
      ctx.body = {
        code: 400,
        message: '无效token',
      };
    }
  }
}

module.exports = {
  authenticate,
};
