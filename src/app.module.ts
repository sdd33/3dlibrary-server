import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegistController } from './regist/regist.controller';
import { LoginController } from './login/login.controller';
import { EmailController } from './email/email.controller';

import { LoginService } from './login/login.service'
import { AppService } from './app.service';
import { RegistService} from './regist/regist.service';
import { EmailService } from './email/email.service';

import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
    useFactory: () => ({
    config: {
    url: 'redis://localhost:6379', },
    }),
  }),
  ],
  controllers: [AppController, RegistController, LoginController, EmailController],
  providers: [AppService, RegistService, LoginService, EmailService],
})
export class AppModule {}
