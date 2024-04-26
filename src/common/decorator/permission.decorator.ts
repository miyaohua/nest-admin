import { SetMetadata } from "@nestjs/common";

export const IS_PERMISSION_KEY = 'isPermission'
// 权限验证
export const PermissionAuth = (permissionKey: string) => SetMetadata(IS_PERMISSION_KEY, permissionKey);