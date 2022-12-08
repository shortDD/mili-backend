import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { LikeService } from './like.service';

@Module({
  providers: [LikeService, LikeResolver],
})
export class LikeModule {}
