import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

// 初始化角色权限用户组和权限
export const initRole = async (role): Promise<void> => {

    // 创建权限组（角色管理）
    const permissionGroup = await prisma.permissionGroup.create({
        data: {
            name: '角色管理'
        }
    })

    // 创建权限（角色管理 - 新增角色）
    const addRole = await prisma.permission.create({
        data: {
            name: 'add-role',
            desc: '新增角色',
            introduce: '拥有角色管理中新增角色权限',
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
            introduce: '拥有角色管理中查询角色权限',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: queryRole.id
        }
    })


    // 创建权限（角色管理 - 修改角色）
    const changeRole = await prisma.permission.create({
        data: {
            name: 'change-role',
            desc: '修改角色',
            introduce: '拥有角色管理中修改角色权限',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: changeRole.id
        }
    })



    // 创建权限（角色管理 - 删除角色）
    const delRole = await prisma.permission.create({
        data: {
            name: 'del-role',
            desc: '删除角色',
            introduce: '拥有角色管理中删除角色权限',
            permissionGroupId: permissionGroup.id
        }
    })
    await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: delRole.id
        }
    })

}
