import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// 初始化角色权限用户组和权限
export const initRolePermission = async (role): Promise<void> => {
    // 创建权限组（角色管理）
    const permissionGroup = await prisma.permissionGroup.create({
        data: {
            name: '角色管理'
        }
    })
    console.log(permissionGroup, '创建角色组')

    // 创建权限（角色管理 - 新增角色）
    const addRole = await prisma.permission.create({
        data: {
            name: 'add-role',
            desc: '新增角色',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: addRole.id
        }
    })



    // 创建权限（角色管理 - 查询角色）
    const queryRole = await prisma.permission.create({
        data: {
            name: 'query-role',
            desc: '查询角色',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: queryRole.id
        }
    })



}
