import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dto/create-comment.dto';
import { CreateReplyInput, CreateReplyOutput } from './dto/create-reply.dto';
import { DelCommentInput, DelCommentOutput } from './dto/del-comment.dto';
import { DelReplyInput, DelReplyOutput } from './dto/del-reply.dto';
import { SeeCommentsInput, SeeCommentsOutput } from './dto/see-comments.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    { id }: User,
    { playload, videoId }: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
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
      await this.prisma.comment.create({
        data: {
          playload,
          user: { connect: { id } },
          video: { connect: { id: video.id } },
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
  async delComment(
    user: User,
    { commentId }: DelCommentInput,
  ): Promise<DelCommentOutput> {
    try {
      const ok = await this.prisma.comment.findFirst({
        where: { id: commentId, userId: user.id },
      });
      if (!ok) {
        return {
          ok: false,
          error: '不是你的评论',
        };
      }
      await this.prisma.comment.delete({ where: { id: commentId } });
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
  async seeComments({
    videoId,
    page,
    take,
  }: SeeCommentsInput): Promise<SeeCommentsOutput> {
    try {
      const ok = await this.prisma.video.findUnique({
        where: { id: videoId },
        select: { id: true },
      });
      if (!ok) {
        return {
          ok: false,
          error: '视频不存在',
        };
      }
      const comments = await this.prisma.comment.findMany({
        where: { videoId },
        skip: page - 1,
        take,
      });
      return {
        ok: true,
        comments,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

@Injectable()
export class ReplyService {
  constructor(private prisma: PrismaService) {}

  async createReply(
    user: User,
    { rootCommentId, parentCommentId, playload }: CreateReplyInput,
  ): Promise<CreateReplyOutput> {
    try {
      await this.prisma.reply.create({
        data: {
          user: { connect: { id: user.id } },
          rootComment: { connect: { id: rootCommentId } },
          ...(parentCommentId && {
            parentComment: { connect: { id: parentCommentId } },
          }),
          playload,
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
  async delReply(
    user: User,
    { replyId }: DelReplyInput,
  ): Promise<DelReplyOutput> {
    try {
      const ok = await this.prisma.reply.findFirst({
        where: { id: replyId, user: { id: user.id } },
      });
      if (!ok) {
        return {
          ok: false,
          error: '无权限',
        };
      }
      await this.prisma.reply.delete({
        where: { id: replyId },
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
}
