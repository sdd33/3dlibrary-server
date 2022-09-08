import { Injectable, Logger } from '@nestjs/common';
import { Fail, FailErrorCode, FailSystemError, Ok, Result } from '../utils/request';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { InjectConnection,InjectClient} from 'nest-mysql';
import { Pool,Connection } from 'mysql2';
const nodemailer = require('nodemailer');
const fs = require("fs")

@Injectable()
export class CommondityService {
  constructor(@InjectRedis() private readonly redis: Redis,
              @InjectClient() private readonly connection: Connection,
  ) {}

  async sendshopdata(): Promise<any> {
    let datalable = [];
    for (let i=1;i<=2;i++){
      datalable.push({
        id:i,
        name:'第'+i+'张图片',
        uri:'http://localhost:3000/image/'+i+'.jpg',
        isBuy:false
      },)
    }
    return datalable;
  }

  async showshop(): Promise<any>{
    for(let i=1;i<=2;i++){
    }
    return Ok('成功')
  }

  async getlist(): Promise<any>{
    const list = await this.connection.query('SELECT * FROM modellist')
    return list[0];
  }
}
