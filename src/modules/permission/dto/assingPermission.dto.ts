import { IsNotEmpty } from "class-validator";

export class assingPermissionDto {
    @IsNotEmpty({ message: '权限id不能为空' })
    permissionIds: number[]

    @IsNotEmpty({ message: '角色id不能为空' })
    roleId: string
}