import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2';
import { initRole } from './initRole'
import { initPermission } from './initPermission'

const prisma = new PrismaClient();

async function seed() {
    // 创建默认用户名（admin）
    const user = await prisma.user.create({
        data: {
            email: 'nest-admin@qq.com',
            username: 'admin',
            password: await hash('mi010409')
        }
    })

    // 创建默认角色（超级管理员）
    const role = await prisma.role.create({
        data: {
            name: "超级管理员",
            desc: "超级管理员是拥有本系统最高权限的角色"
        }
    })

    // 用户角色关联
    const userRole = await prisma.userRole.create({
        data: {
            userId: user.id,
            roleId: role.id
        }
    })


    // 初始化角色权限用户组和权限
    initRole(role)
    initPermission(role)
}


seed()