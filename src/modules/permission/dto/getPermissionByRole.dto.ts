import { IsNotEmpty } from "class-validator";

export class getPermissionByRoleDto {
    @IsNotEmpty({ message: '角色id不能为空' })
    roleId: string
}
