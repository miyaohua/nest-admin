import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../common/jwt/jwt.strategy';
import { SECRET, EXPIRESIN } from '../../constants/jwt.constant'

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET,
      signOptions: {
        expiresIn: EXPIRESIN
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule { }
