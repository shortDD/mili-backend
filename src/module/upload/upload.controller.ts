import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_KEYID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const objName = `${Date.now() + file.originalname}`;
    try {
      await new AWS.S3()
        .putObject({
          Key: objName,
          Bucket: process.env.BUCKET_NAME,
          Body: file.buffer,
          ACL: 'public-read',
        })
        .promise();
      const fileUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${objName}`;
      return { fileUrl };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
