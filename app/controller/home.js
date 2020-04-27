'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    console.log('body ---> ', this.ctx.request.body);

    this.ctx.body = {
      code: 0,
      data: {
        name: '1',
      },
      // message: '200',
    };
  }

  async getUser() {
    console.log('body ---> ', this.ctx.request.body);

    this.ctx.body = null;
  }
}

module.exports = HomeController;
