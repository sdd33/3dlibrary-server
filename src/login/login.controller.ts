import { Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request } from 'express';

@Controller('login')
export class LoginController {

  constructor(
    private readonly appService: LoginService
  ) {}

  @Get('get')
  async autologin(@Req() request: Request)  {
    console.log(request.headers.my_token);
    return this.appService.getHello(request.headers.my_token);
  }

  @Post('post')
   async create(@Req() request: Request) {
    let ret = await this.appService.login(request.body.mobile, request.body.code, 3600 * 24);
    return {
      ...ret,
      data: {
        token: ret.data
      }
    }
  }
  //退出
  @Post('logout')
  async logout(@Req() request: Request) {
    let ret = await this.appService.logout(request.body.token);
    return {
      ...ret,
      data: {
        token: ret.data
      }
    }
  }
  //注销
  @Post('cancellation')
  async cancellation(@Req() request: Request){
    let ret = await this.appService.cancellation(request.body.token);
    return {
      ...ret,
      data: {
        token: ret.data
      }
    }
  }
}


