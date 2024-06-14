import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { getPermissionByRoleDto } from './dto/getPermissionByRole.dto'
import { PermissionAuth } from '../../common/decorator/permission.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post('permissionByGroup')
  permissionByRole() {
    return this.permissionService.permissionByRole()
  }

  @Post('getPermissionByRole')
  getPermissionByRole(@Body() getPermissionByRoleDto: getPermissionByRoleDto) {
    return this.permissionService.getPermissionByRole(getPermissionByRoleDto)
  }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
