'use strict';

const Controller = require('egg').Controller;
const uuid = require('uuid');
const moment = require('moment');

class BorrowerController extends Controller {
  async baseInfo() {
    this.ctx.body = {
      code: 0,
      data: this.ctx.state.borrower,
    };
  }

  async findMobile() {
    const { mobile } = this.ctx.request.body;
    const borrower = await this.app.mysql.get('borrower', {
      mobile,
    });
    this.ctx.body = {
      code: borrower ? 0 : -1,
      message: 'ok',
    };
  }

  async regist() {
    const { mobile, password, vrCode } = this.ctx.request.body;
    this.ctx.logger.debug(this.ctx.request.body);
    const borrower = await this.app.mysql.get('borrower', {
      mobile,
    });
    if (borrower) {
      this.ctx.body = {
        code: -1,
        message: '手机号已被注册',
      };
      return;
    }
    if (vrCode !== '6666') {
      // TODO 验证验证码
      this.ctx.body = {
        code: -1,
        message: '验证码错误',
      };
      return;
    }
    const result = await this.app.mysql.insert('borrower', {
      id: uuid.v1(),
      mobile,
      password: this.ctx.helper.md5(password),
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    if (result.affectedRows === 1) {
      this.ctx.body = {
        code: 0,
        message: '注册成功',
      };
    } else {
      this.ctx.body = {
        code: -1,
        message: '服务器错误',
      };
    }
  }

  async oauth() {
    const { grantType, mobile, password, refreshToken } = this.ctx.request.body;
    let borrower;
    if (grantType === 'password') {
      borrower = await this.app.mysql.get('borrower', {
        mobile,
        password: this.ctx.helper.md5(password),
      });
    } else {
      const refreshtoken = await this.app.mysql.get('oauth_refresh_token', {
        refreshToken,
        client: this.config.oauth.id,
      });
      if (refreshtoken) {
        borrower = await this.app.mysql.get('borrower', {
          id: refreshtoken.user,
        });
      } else {
        this.ctx.body = {
          code: -1,
          message: '无效token',
        };
      }
    }
    if (borrower) {
      const token = await this.ctx.service.oauth.createToken(borrower);
      if (token) {
        this.ctx.body = {
          code: 0,
          data: token,
        };
      } else {
        this.ctx.body = {
          code: -1,
          message: '服务器错误',
        };
      }
    } else {
      this.ctx.body = {
        code: -1,
        message: '密码错误',
      };
    }
  }
}

module.exports = BorrowerController;
