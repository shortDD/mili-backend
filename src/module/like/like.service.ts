import { Injectable } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import {
  ToggleLikeCommentInput,
  ToggleLikeCommentOutput,
  ToggleLikeInput,
  ToggleLikeOutput,
} from './dto/like-video.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async toggleLike(
    user: User,
    { videoId }: ToggleLikeInput,
  ): Promise<ToggleLikeOutput> {
    try {
      const video = await this.prisma.video.findUnique({
        where: { id: videoId },
      });
      if (!video) {
        return {
          ok: false,
          error: '视频不存在',
        };
      }
      const likeWhere = { userId_videoId: { videoId, userId: user.id } };
      const like = await this.prisma.videoLike.findUnique({
        where: likeWhere,
      });
      if (like) {
        await this.prisma.videoLike.delete({ where: likeWhere });
      } else {
        await this.prisma.videoLike.create({
          data: {
            user: { connect: { id: user.id } },
            video: { connect: { id: videoId } },
          },
        });
      }
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
  async toggleLikeComment(
    user: User,
    { commentId, replyId }: ToggleLikeCommentInput,
  ): Promise<ToggleLikeCommentOutput> {
    try {
      if (commentId) {
        const comment = await this.prisma.comment.findUnique({
          where: { id: commentId },
        });
        const commentLikeWhere = {
          userId_commentId: { userId: user.id, commentId },
        };
        if (!comment) {
          return {
            ok: false,
            error: '评论不存在',
          };
        }
        const commentLike = await this.prisma.commentLike.findUnique({
          where: commentLikeWhere,
        });
        if (commentLike) {
          await this.prisma.commentLike.delete({ where: commentLikeWhere });
        } else {
          await this.prisma.commentLike.create({
            data: {
              user: { connect: { id: user.id } },
              comment: { connect: { id: comment.id } },
            },
          });
        }
      } else if (replyId) {
        const reply = await this.prisma.reply.findUnique({
          where: { id: replyId },
        });
        if (!reply) {
          return {
            ok: false,
            error: '评论不存在',
          };
        }
        const replyLikeWhere = {
          userId_replyId: { userId: user.id, replyId },
        };
        const replyLike = await this.prisma.commentLike.findUnique({
          where: replyLikeWhere,
        });
        if (replyLike) {
          console.log(replyLike);
          await this.prisma.commentLike.delete({ where: replyLikeWhere });
        } else {
          await this.prisma.commentLike.create({
            data: {
              user: { connect: { id: user.id } },
              reply: { connect: { id: reply.id } },
            },
          });
        }
      }
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
}
