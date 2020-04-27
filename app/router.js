'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  router.get('/api/login', controller.home.login);
  router.post('/api/login', controller.home.login);

  // 借款人基本信息
  router.get('/api/borrower/baseinfo', middleware.oauth.authenticate, controller.borrower.baseInfo);
  // 借款人注册
  router.post('/api/borrower/regist', controller.borrower.regist);
  // 查找号码
  router.post('/api/borrower/mobile/find', controller.borrower.findMobile);
  // 登录或者刷新token
  router.post('/api/borrower/oauth', controller.borrower.oauth);
};
