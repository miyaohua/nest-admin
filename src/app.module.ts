import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import allConfig from './common/detachment/app.register'

@Module({
  imports: [UserModule, RoleModule, PermissionModule, PrismaModule],
  controllers: [],
  providers: [...allConfig],
})

export class AppModule { }
