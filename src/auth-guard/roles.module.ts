import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from 'src/module/user/user.module';
import { RolesGuard } from './roles.guard';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [UserModule, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
