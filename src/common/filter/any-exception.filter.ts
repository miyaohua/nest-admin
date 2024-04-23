/**
 * 全局异常过滤器
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

interface myError {
  readonly status: number
  readonly statusCode?: number
  readonly message?: string
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : (exception as myError)?.status || (exception as myError)?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR

    let message
      = (exception as any)?.response?.message
      || (exception as myError)?.message
      || `${exception}`


    // 通用返回结果
    const baseResponse = {
      code: status,
      message,
      data: null
    }

    response.status(status).send(baseResponse);
  }
}