import { Module } from '@nestjs/common';
import { CommentResolver, ReplyResolver } from './comment.resolver';
import { CommentService, ReplyService } from './comment.service';

@Module({
  providers: [CommentResolver, CommentService, ReplyService, ReplyResolver],
  exports: [CommentService, ReplyService],
})
export class CommentModule {}
