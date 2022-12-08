import { Module } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';
@Module({
  imports: [CommentModule],
  providers: [VideoService, VideoResolver],
})
export class VideoModule {}
