import { Injectable, Logger } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { randomUUID } from 'crypto';
import { Fail, FailErrorCode, FailSystemError, Ok, Result } from '../utils/request';
import { AuthErrorCode } from '../error_code/auth';

export interface LoginReq {
  username: string,
  password: string
}


@Injectable()
export class LoginService {

  private readonly logger = new Logger(LoginService.name);
  constructor(@InjectRedis() private readonly redis: Redis,
  ) {}

  async getHello(token: any) {
    try {
      let value = await this.redis.get(token);
      if (value !== null) {
        return Ok(token);
      } else {
        return FailErrorCode(AuthErrorCode.NO_USER);
      }
    } catch (e) {
      let error_id = randomUUID();
      this.logger.error(`[trace_id]${error_id}[msg]redis access fail[error]${e.message}`);
      return FailSystemError(e);
    }
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

  async logout(token: string): Promise<Result<string>> {
    try {
        let username = await this.redis.get(token);
        if(username !== null){
          await this.redis.del(username);
          await this.redis.del(token);
          return Ok("已经退出");
        }else {
          return Fail("已经退出");
        }
    } catch (e) {
        let error_id = randomUUID();
        this.logger.error(`[trace_id]${error_id}[msg]redis access fail[error]${e.message}`);
        return FailSystemError(e);
    }
  }

  async cancellation(token: string): Promise<Result<string>> {
    try {
      let username = await this.redis.get(token);
      if(username !== null){
        await this.redis.del(token);
        await this.redis.del(username);
        await this.redis.del("user:" + username)
        return Ok("注销成功");
      }else {
        return Fail("未找到用户");
      }
    } catch (e) {
      let error_id = randomUUID();
      this.logger.error(`[trace_id]${error_id}[msg]redis access fail[error]${e.message}`);
      return FailSystemError(e);
    }
  }
}
