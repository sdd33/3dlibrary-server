import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { randomUUID } from 'crypto';
import { Fail, FailErrorCode, FailSystemError, Ok, Result } from './utils/request';
import { AuthErrorCode } from './error_code/auth';

export interface LoginReq {
  username: string,
  password: string
}


@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(@InjectRedis() private readonly redis: Redis,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(username: string, password: string, timeout: number): Promise<Result<string>> {
    try {
      let value = await this.redis.get("user:" + username);
      if (value === password) {
        let token = randomUUID();
        await this.redis.setex(username,timeout, token);
        await this.redis.setex(token,timeout, username);
        return Ok(token);
      } else {
        if (!value) {
          return FailErrorCode(AuthErrorCode.NO_USER);
        } else {
          return FailErrorCode(AuthErrorCode.PASS_FAULT);
        }

      }
    } catch (e) {
      let error_id = randomUUID();
      this.logger.error(`[trace_id]${error_id}[msg]redis access fail[error]${e.message}`);
      return FailSystemError(e);
    }
  }
}
