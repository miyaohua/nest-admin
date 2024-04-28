import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { AllExceptionFilter } from '../filter/any-exception.filter'
import { TransformInterceptor } from '../interceptors/transform.interceptor'
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { PermissionGuard } from '../guard/permission.guard';

// 全局的一些配置
export default [
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
    },
    // 权限
    {
        provide: APP_GUARD,
        useClass: PermissionGuard
    }
]