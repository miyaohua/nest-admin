import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { PermissionAuth } from 'src/common/decorator/permission.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  @PermissionAuth('add-role')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @PermissionAuth('query-role')
  findAll(@Query() addRoleDto: AddRoleDto) {
    return this.roleService.findAll(addRoleDto);
  }

  @Patch(':id')
  @PermissionAuth('change-role')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @PermissionAuth('del-role')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
