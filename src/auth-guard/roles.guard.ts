import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from 'src/module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles[]>(
      'roles',
      context.getHandler(),
    );
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const { token } = gqlContext;
    if (token) {
      const decoded = await this.jwt.verify(token, {
        secret: jwtConstants.secret,
      });
      const { user } = await this.userService.userProfle({ id: decoded.id });
      gqlContext['user'] = user;
    }
    if (!roles) return true;
    if (gqlContext['user']) {
      if (roles.includes('Any')) {
        return true;
      } else {
        return gqlContext['user'].username === 'Vip';
      }
    }
    return false;
  }
}
