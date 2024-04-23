import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { unifiedResponse } from '../model/response.model'


@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor() { }
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return new unifiedResponse(HttpStatus.OK, data ?? null)
            }),
        )
    }
}