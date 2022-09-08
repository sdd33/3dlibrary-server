import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommondityService } from './commondity.service';
import { Request } from 'express';
const fs = require("fs");
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('commodity')
export class CommodityController{

  constructor(
    private readonly appService: CommondityService
  ) {}

  @Get()
  async showshop(@Req() request: Request) {
    return this.appService.sendshopdata()
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('img'))
  async update(@UploadedFile() file) {
    console.log(file);
    fs.writeFileSync("./src/commodity/data/image/3.jpg", file.buffer);
    fs.writeFileSync("./src/commodity/data/image/3.png", file.buffer);
    fs.writeFileSync("./src/commodity/data/image/3.txt", file.buffer);
    return '图片发送成功';
  }

  @Get('getlist')
  async create(@Req() request: Request) {
    return this.appService.getlist();
  }
}
