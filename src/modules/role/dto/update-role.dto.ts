import { IsNotEmpty } from 'class-validator'
export class UpdateRoleDto {

    @IsNotEmpty({ message: '请输入角色名称' })
    name: string

    @IsNotEmpty({ message: '请输入角色描述' })
    desc: string
}
