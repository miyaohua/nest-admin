import { IsEmail, IsNotEmpty } from "class-validator"
import { IsUniqueField } from '../../rules/unique-field.rule'

export class CreateUserDto {
    @IsNotEmpty({ message: '请输入用户名' })
    @IsUniqueField('user', { message: '该用户名已被注册' })
    username: string

    @IsNotEmpty({ message: '请输入密码' })
    password: string

    @IsEmail()
    @IsUniqueField('user', { message: '该邮箱已被注册' })
    email: string;
}
