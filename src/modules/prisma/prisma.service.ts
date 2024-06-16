import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import * as moment from 'moment';

@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        super()
        // prisma middleware
        this.$use(this.formatTimeMiddleware)
    }

    async formatTimeMiddleware(params, next) {
        const result = await next(params);
        console.log(result);
        const isArray = Array.isArray(result) && result.length > 0
        const isObject = Object.prototype.toString.call(result) === '[object Object]'

        if (isArray) {
            return result.map(item => ({
                ...item,
                createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            }));
        }
        
        return result;
    }

}
