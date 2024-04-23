import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: { enableImplicitConversion: true },
    errorHttpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    stopAtFirstError: true,
    // 自定义处理错误方法(返回第一项报错信息)
    exceptionFactory: errors =>
      new UnprocessableEntityException(
        errors.map((e) => {
          const rule = Object.keys(e.constraints!)[0]
          const msg = e.constraints![rule]
          return msg
        })[0],
      ),
  }))

  await app.listen(3000);
}
bootstrap();
