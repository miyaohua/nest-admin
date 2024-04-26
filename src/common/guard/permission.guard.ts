import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Reflector } from '@nestjs/core';
import { IS_PERMISSION_KEY } from '../decorator/permission.decorator'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService, private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest()
    // 获取传入的权限标识
    const permissionKey = this.reflector.getAllAndOverride<string>(IS_PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // 获取当前用户id
    const userId = request?.user?.userId
    if (!userId) {
      return true
    }
    // 当前用户的角色
    const roleIds = request?.user?.roleIds || []
    return this.findRolesByIds(permissionKey, roleIds)
  }


  /**
   * userId
   * 通过用户id查询权限
   */
  async findRolesByIds(permissionKey: string, roleIds: number[]) {
    // 获取权限标识id
    const permission = await this.prisma.permission.findFirst({
      where: {
        name: permissionKey
      }
    })
    // 查询当前权限需要角色id
    const needRole = await this.prisma.rolePermission.findFirst({
      where: {
        permissionId: permission.id
      }
    })
    return roleIds.includes(needRole.roleId)
  }
}
