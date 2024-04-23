import { IsNotEmpty } from 'class-validator'
export class CreateRoleDto {
    @IsNotEmpty({ message: '请输入角色名称' })
    name: string
}
