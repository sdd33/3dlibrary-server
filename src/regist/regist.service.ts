import { Injectable, Logger } from '@nestjs/common';
import { FailErrorCode, FailSystemError, Ok, Result } from '../utils/request';
import { randomUUID } from "crypto";
import { AuthErrorCode } from '../error_code/auth';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RegistService {

  private readonly logger = new Logger(RegistService.name);
  constructor(@InjectRedis() private readonly redis: Redis,
  ) {}


  async regist(username:string, password:string, email:string, captcha:string, timeout: number): Promise<Result<string>> {
    try {
      let value = await this.redis.get("email:" + email);
      console.log(value);
      if (value === captcha){
        await this.redis.set("user:" + username,password);
        return Ok('注册成功');
      }else {
        return FailErrorCode(AuthErrorCode.CAP_ERR);
      }
    } catch (e) {
      let error_id = randomUUID();
      this.logger.error(`[trace_id]${error_id}[msg]redis access fail[error]${e.message}`);
      return FailSystemError(e);
    }
  }
}
