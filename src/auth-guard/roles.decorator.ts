import { SetMetadata } from '@nestjs/common';
export type AllowedRoles = 'Any' | 'Vip';

export const Roles = (...roles: AllowedRoles[]) => SetMetadata('roles', roles);
