import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { bussException } from 'src/common/exception/buss.exception';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) { }

  // 通过权限分组获取权限
  async permissionByRole() {
    let allGroupsAndPermissions = await this.prisma.permissionGroup.findMany({
      include: {
        permission: true
      }
    });
    allGroupsAndPermissions = allGroupsAndPermissions.map(v => {
      return {
        ...v,
        selectId: v.permission.map(r => r.id)
      }
    })
    return allGroupsAndPermissions
  }

  // 为角色分配权限
  async assingPermission({ permissionIds, roleId }) {

    // 先删除所有权限，在重新分配
    await this.prisma.rolePermission.deleteMany({
      where: {
        roleId: +roleId
      }
    })

    const isAdd = await this.prisma.rolePermission.createMany({
      data: permissionIds.map((v: any) => {
        return {
          roleId: +roleId,
          permissionId: v
        }
      })
    })

    if (isAdd.count == 0) {
      throw new bussException('权限分配失败')
    }

    return '权限分配成功'
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
