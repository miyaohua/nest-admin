import { IsNotEmpty } from "class-validator";
import { IsUniqueField } from "src/common/rules/unique-field.rule";
export class CreatePermissionDto {
    @IsNotEmpty({ message: '权限名称不能为空' })
    @IsUniqueField('permission', { message: '该权限已存在' })
    name: string

    @IsNotEmpty({ message: '权限描述不能为空' })
    desc: string

    @IsNotEmpty({ message: '权限介绍不能为空' })
    introduce: string
}
