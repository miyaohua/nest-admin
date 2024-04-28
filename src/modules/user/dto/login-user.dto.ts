import { IsNotEmpty } from "class-validator";
export class LoginUserDto {
    @IsNotEmpty({ message: '请填写用户名' })
    username: string
    @IsNotEmpty({ message: '请填写密码' })
    password: string
}