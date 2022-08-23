import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   allowedHeaders: ["content-type", "TOKEN", "Authorization"],
  //   origin: "http://localhost:3000"
  // });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
