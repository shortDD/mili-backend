import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { UserModule } from './module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthModule } from './auth-guard/roles.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UploadModule } from './module/upload/upload.module';
import { VideoModule } from './module/video/video.module';
import { CommentModule } from './module/comment/comment.module';
import { CategoryModule } from './module/category/category.module';
import { LikeModule } from './module/like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.valid('dev', 'production', 'test').required(),
        AWS_KEYID: Joi.string().required(),
        AWS_SECRET_KEY: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({
        token: req.headers['token'],
      }),
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    VideoModule,
    UploadModule,
    CommentModule,
    CategoryModule,
    LikeModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
