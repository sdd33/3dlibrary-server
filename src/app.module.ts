import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegistController } from './regist/regist.controller';
import { LoginController } from './login/login.controller';
import { EmailController } from './email/email.controller';
import { CommodityController } from './commodity/commodity.controller';

import { LoginService } from './login/login.service'
import { AppService } from './app.service';
import { RegistService} from './regist/regist.service';
import { EmailService } from './email/email.service';
import { CommondityService } from './commodity/commondity.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from '@nestjs-modules/ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlModule } from 'nest-mysql/dist';

@Module({
  imports: [
    RedisModule.forRootAsync({
    useFactory: () => ({
    config: {
    url: 'redis://localhost:6379', },
    }),
  }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'modelshop',
    //   entities: [],
    //   synchronize: true,
    // }),
    MysqlModule.forRoot({
      host: 'localhost',
      database: 'modelshop',
      password: '',
      user: 'root',
      port: 3306,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../data'),
    }),
  ],
  controllers: [AppController, RegistController, LoginController, EmailController,
    CommodityController],
  providers: [AppService, RegistService, LoginService, EmailService,
    CommondityService],
})
export class AppModule {}
