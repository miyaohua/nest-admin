import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET } from '../../constants/jwt.constant'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // 对应初始化passport-jwt策略的参数
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET
        });
    }

    async validate(payload: any) {
        // jwt鉴权通过后，会返回鉴权信息，然后将对象设置在req.user上面
        return { userId: payload.id, username: payload.username };
    }
}