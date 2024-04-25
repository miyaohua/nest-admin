import { RESPONSE_SUCCESS_MESSAGE, RESPONSE_SUCCESS_CODE } from '../../constants/response.constant'
import {
    HttpStatus
} from '@nestjs/common'

// 默认返回
export class unifiedResponse<T = any> {
    code: number;
    message: string
    data?: T;

    constructor(code: number, data: T, message?: string) {
        this.code = code || RESPONSE_SUCCESS_CODE;
        this.message = message || RESPONSE_SUCCESS_MESSAGE;
        this.data = data ?? null;
    }
}

// 待添加...