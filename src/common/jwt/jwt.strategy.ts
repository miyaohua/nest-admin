import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET } from '../../constants/jwt.constant'
import { PrismaService } from 'src/prisma/prisma.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService) {
        // 对应初始化passport-jwt策略的参数
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET
        });
    }

    async validate(payload: any) {
        // jwt鉴权通过后，会返回鉴权信息，然后将对象设置在req.user上面
        const roleIds = this.getRolesByUser(payload.id)
        return { userId: payload.id, username: payload.username, roleIds };
    }

    /**
     * 获取当前用户的角色
     * @param userId 用户角色
     * @returns 
     */
    async getRolesByUser(userId: number) {
        const roleArr = await this.prisma.userRole.findMany({
            where: {
                userId
            }
        })
        const roleIds = roleArr.map(r => Number(r.roleId))
        return roleIds;
    }
}