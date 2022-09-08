import { Injectable, Logger } from '@nestjs/common';
import { Fail, FailErrorCode, FailSystemError, Ok, Result } from '../utils/request';
import { randomUUID } from "crypto";
import { AuthErrorCode } from '../error_code/auth';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
const nodemailer = require('nodemailer');

const getrandnum = ()=>{
  const min = 100000;
  const max = 999999;
  const range  = max - min;
  const random = Math.random();
  const result = min + Math.round(random * range);
  return result;
}
@Injectable()
export class EmailService {

  private readonly logger = new Logger(EmailService.name);
  constructor(@InjectRedis() private readonly redis: Redis,
  ) {}




  async sendemail(email: string, timeout: number): Promise<Result<string>> {
    let captcha = getrandnum();
    let message : string = "<b>验证码："+captcha.toString() + '</b>';

    let transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secureConnection: true, // use SSL
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: '822095092@qq.com',
        pass: 'bbtyvxhmlnvobcei' //QQ邮箱授权码
      }
    });
    let mailOptions = {
      from: '"验证码" <822095092@qq.com>', // 发件人
      to: email, // 收件人
      subject: '来自3D Library的验证码', // 主题
      text: '验证码：' + captcha.toString(),
      html: message,
    };

    try {
        await this.redis.setex("email:" + email,timeout, captcha);
        await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log(`Message: ${info.messageId}`);
          console.log(`sent: ${info.response}`);
        });
        return Ok('成功发送');
    }catch (e) {
      return Fail("未知错误",-3);
    }
  }
}
