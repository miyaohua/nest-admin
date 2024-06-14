import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) { }

  // 通过权限分组获取权限
  async permissionByRole() {
    const allGroupsAndPermissions = await this.prisma.permissionGroup.findMany({
      include: {
        permission: true
      }
    });
    return allGroupsAndPermissions
  }

  // 根绝用户角色获取权限
  getPermissionByRole(getPermissionByRoleDto) {
    console.log(getPermissionByRoleDto, 'getPermissionByRoleDto')
  }


  // 新增权限
  create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        ...createPermissionDto
      }
    })
  }

  async findAll() {
    return await this.prisma.permissionGroup.findMany()
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
