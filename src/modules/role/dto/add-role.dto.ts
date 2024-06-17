import { IsNotEmpty, IsOptional } from "class-validator"

export class AddRoleDto {
    @IsNotEmpty({ message: '请输入页码' })
    page: number

    @IsNotEmpty({ message: '请输入页数' })
    pageSize: number

    @IsOptional()
    name: string
}
