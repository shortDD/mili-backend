import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { CreateVideoInput, CreateVideoOutput } from './dto/create-video.dto';
import { DelVideoInput, DelVideoOutput } from './dto/del-video.dto';
import {
  EditIntroductionInput,
  EditIntroductionOutput,
} from './dto/edit-introduction.dto';
import { SearchVideoInput, SearchVideoOutput } from './dto/search-video.dto';
import { SeeVideoInput, SeeVideoOutput } from './dto/see-video.dto';
import { SeedFeedOutput } from './dto/seedFeed.dto';

//create Video
//seedFeed Video
@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) {}
  async createVideo(
    user: User,
    { title, coverUrl, fileUrl, introduction, categoryId }: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    try {
      await this.prisma.video.create({
        data: {
          title,
          coverUrl,
          fileUrl,
          introduction,
          user: {
            connect: { id: user.id },
          },
          category: {
            connect: { id: categoryId },
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
  async delVideo(
    user: User,
    { videoId }: DelVideoInput,
  ): Promise<DelVideoOutput> {
    try {
      const ok = await this.prisma.video.findFirst({
        where: { id: videoId, userId: user.id },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: '无权限删除或者视频不存在',
        };
      }
      await this.prisma.video.delete({ where: { id: ok.id } });
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
  async seeVideo({ id }: SeeVideoInput): Promise<SeeVideoOutput> {
    try {
      const video = await this.prisma.video.findUnique({
        where: { id },
      });
      if (!video) {
        return {
          ok: false,
          error: '视频不存在',
        };
      } else {
        return {
          ok: true,
          video,
        };
      }
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async editIntroduction(
    user: User,
    { videoId, introduction }: EditIntroductionInput,
  ): Promise<EditIntroductionOutput> {
    try {
      const ok = await this.prisma.video.findFirst({
        where: { id: videoId, userId: user.id },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: '无权限编辑或者视频不存在',
        };
      }
      await this.prisma.video.update({
        where: { id: ok.id },
        data: { introduction },
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

  async seedFeed(): Promise<SeedFeedOutput> {
    try {
      const videos = await this.prisma.video.findMany();
      return {
        ok: true,
        videos,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchVideo({ keyword }: SearchVideoInput): Promise<SearchVideoOutput> {
    try {
      const videos = await this.prisma.video.findMany({
        where: { title: { contains: keyword } },
      });
      return {
        ok: true,
        videos,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
