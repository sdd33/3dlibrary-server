import { Controller, Get, Post, Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { Request } from 'express';

@Controller('email')
export class EmailController {

  constructor(
    private readonly appService: EmailService
  ) {}


  @Get('get')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Post('post')
  async create(@Req() request: Request) {
    let ret = await this.appService.sendemail(request.body.email, 3600 * 6);
    return {
      ...ret,
      data: {
        token: ret.data
      }
    }
  }
}