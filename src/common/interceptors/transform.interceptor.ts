import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor() { }
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return {
                    code: HttpStatus.OK,
                    data: data || null
                }
            }),
        )
    }
}