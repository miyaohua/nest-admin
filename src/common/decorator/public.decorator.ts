import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic'
// jwt 过滤验证
export const PublicAuth = () => SetMetadata(IS_PUBLIC_KEY, true);