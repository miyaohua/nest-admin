import { IsNotEmpty } from 'class-validator'
import { IsUniqueField } from '../../common/rules/unique-field.rule'
export class CreateRoleDto {

    @IsNotEmpty({ message: '请输入角色名称' })
    @IsUniqueField('role', { message: '该用户角色已被添加' })
    name: string
}
