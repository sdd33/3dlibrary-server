import { Controller, Get, Post, Req } from '@nestjs/common';
import { RegistService } from './regist.service';
import { Request } from 'express';

@Controller('regist')
export class RegistController {

  constructor(
    private readonly appService: RegistService
  ) {}

  @Get('get')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('post')
  async create(@Req() request: Request) {
    let ret = await this.appService.regist(
      request.body.username, request.body.password, request.body.email, request.body.captcha , 3600 * 24);
    return {
      ...ret,
      data: {
        token: ret.data
      }
    }
  }
}