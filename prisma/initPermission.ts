import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// 初始化角色权限用户组和权限
export const initPermission = async (role): Promise<void> => {

    // 创建权限组（角色管理）
    const permissionGroup = await prisma.permissionGroup.create({
        data: {
            name: '权限管理'
        }
    })

    // 创建权限（角色管理 - 分配权限）
    const assingPermission = await prisma.permission.create({
        data: {
            name: 'assing-permission',
            desc: '分配权限',
            introduce: '为已有角色分配权限',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: assingPermission.id
        }
    })

    // 创建权限（角色管理 - 查询权限）
    const queryPermission = await prisma.permission.create({
        data: {
            name: 'query-permission',
            desc: '查询权限',
            introduce: '查询已有的权限',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: queryPermission.id
        }
    })
}
