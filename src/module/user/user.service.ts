import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';
import { MeOutput } from './dto/me.dto';
import { UserProfileInput, UserProfileOutput } from './dto/userProfile.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FollowUserInput, FollowUserOutput } from './dto/follow-user.dto';
import { UnfollowUserInput, UnfollowUserOutput } from './dto/unfollow-user.dto';
import { SeeFollowersInput, SeeFollowersOutput } from './dto/see-follower.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createAccount({
    avatar,
    username,
    password,
    bio,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const ok = await this.prisma.user.findUnique({ where: { username } });
      if (ok)
        return {
          ok: false,
          error: '用户已存在',
        };
      const _password = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          avatar,
          username,
          password: _password,
          bio,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (!user)
        return {
          ok: false,
          error: '用户不存在',
        };

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return {
          ok: false,
          error: '密码不正确',
        };
      }
      const token = this.jwtService.sign(
        { id: user.id },
        { secret: jwtConstants.secret },
      );
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async userProfle({ id }: UserProfileInput): Promise<UserProfileOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          followed: true,
          following: true,
        },
      });
      if (user) {
        return {
          ok: true,
          user: user,
        };
      } else {
        return {
          ok: false,
          error: '用户不存在',
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async updateUser(
    user: User,
    { username, avatar, bio, password }: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    try {
      let hashPassword = undefined;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }
      const ok = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          ...(username && { username }),
          ...(avatar && { avatar }),
          ...(bio && { bio }),
          ...(hashPassword && { password: hashPassword }),
        },
      });
      if (ok) {
        return {
          ok: true,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async followUser(
    user: User,
    { userId }: FollowUserInput,
  ): Promise<FollowUserOutput> {
    try {
      const ok = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!ok) {
        return {
          ok: false,
          error: '用户不存在',
        };
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          following: {
            connect: { id: userId },
          },
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async unfollowUser(
    user: User,
    { userId }: UnfollowUserInput,
  ): Promise<UnfollowUserOutput> {
    try {
      const ok = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!ok) {
        return {
          ok: false,
          error: '用户不存在',
        };
      }
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          following: {
            disconnect: { id: userId },
          },
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async seeFollowers({
    username,
    page,
    take,
  }: SeeFollowersInput): Promise<SeeFollowersOutput> {
    try {
    } catch (error) {
      return {
        ok: false,
      };
    }
  }
}
