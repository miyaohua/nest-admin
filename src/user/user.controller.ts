import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { PublicAuth } from '../common/decorator/public.decorator';
import { PermissionAuth } from '../common/decorator/permission.decorator'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  @PublicAuth()
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }



  @Post('register')
  @PermissionAuth('create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
