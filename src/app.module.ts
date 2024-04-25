import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from './common/filter/any-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { JwtAuthGuard } from './common/jwt/jwt-auth.guard';

@Module({
  imports: [UserModule, RoleModule, PermissionModule, PrismaModule],
  controllers: [],
  providers: [
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    // 全局拦截器(添加code,data)
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    // jwt
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule { }
