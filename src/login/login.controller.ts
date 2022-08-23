import { Controller, Get, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request } from 'express';

@Controller('login')
export class LoginController {

  constructor(
    private readonly appService: LoginService
  ) {}

  @Get('get')
  getHello(): string {
    return this.appService.getHello();
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
}


