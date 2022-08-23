import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService, LoginReq } from './app.service';
import { Request, Response } from 'express';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              @InjectRedis() private readonly redis: Redis,
  ) {}

  @Get()
  async creat(@Req() request: Request) {
    console.log(request.query.name);
    return this.appService.getHello();
  }

  @Post('')
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


