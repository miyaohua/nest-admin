import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) { }

  // 新增角色
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        ...createRoleDto
      }
    })
  }

  // 分页查询所有角色
  async findAll({ page, pageSize, name }: AddRoleDto) {
    console.log(name, 'name--');

    const skipRecords = (page - 1) * pageSize;
    const total = await this.prisma.role.count({
      where: {
        name: {
          contains: name
        }
      }
    });
    const data = await this.prisma.role.findMany({
      where: {
        name: {
          contains: name
        }
      },
      skip: Number(skipRecords) || 0,
      take: Number(pageSize) || 0,
    });

    return {
      list: data,
      total
    };
  }

  // 查询单个角色
  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  // 更新角色
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  // 删除角色
  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
