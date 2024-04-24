import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2';
const prisma = new PrismaClient()


// 初始化(用户、角色、权限)
async function mainRBAC() {
    let user = await prisma.user.create({
        data: {
            username: 'admin',
            password: await hash('mi010409'),
            email: 'admin@vpske.cn'
        }
    })

    let role = await prisma.role.create({
        data: {
            name: '超级管理员'
        }
    })

    let permission = await prisma.permission.create({
        data: {
            name: 'create-user',
            desc: '新增用户'
        }
    })
    console.log(user, role, permission, '生成的用户、角色、权限数据')


    // 关联
    let userOrRole = await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: role.id
        }
    })

    let roleOrPermission = await prisma.rolePermission.create({
        data: {
            roleId: role.id,
            permissionId: permission.id
        }
    })
    console.log(userOrRole, roleOrPermission, '用户、角色、权限关联数据')
}

mainRBAC()