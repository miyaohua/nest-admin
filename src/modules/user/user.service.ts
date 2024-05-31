import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { bussException } from '../../common/exception/buss.exception'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password)
      }
    })
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: loginUserDto.username
      }
    })
    console.log(await hash(loginUserDto.password))
    if (!user) throw new bussException('该用户不存在')
    if (!await verify(user.password, loginUserDto.password)) {
      throw new bussException('密码校验错误')
    }
    // 生成jwt并返回
    return {
      type: 'Bearer',
      token: this.jwtService.sign(user)
    }
  }
}