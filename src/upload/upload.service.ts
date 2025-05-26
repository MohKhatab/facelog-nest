import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.getOrThrow('AWS_S3_REGION'),
      endpoint: configService.getOrThrow('AWS_S3_ENDPOINT'),
      credentials: {
        accessKeyId: configService.getOrThrow('AWS_S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.getOrThrow('AWS_S3_ACCESS_KEY_SECRET'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(fileName: string, file: Buffer): Promise<string> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: fileName,
          Body: file,
        }),
      );
    } catch (err) {
      console.log('----------- Image Upload Error -----------');
      console.error(err);
      throw new InternalServerErrorException('Failed to upload image');
    }

    return this.configService.get('AWS_S3_PUBLIC_URL') + fileName;
  }

  async uploadMultipleFiles(
    files: Array<{ stream: Buffer; fileName: string }>,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.uploadFile(file.fileName, file.stream),
    );

    return Promise.all(uploadPromises);
  }

  async deleteImage(url: string) {
    const key: string = url.split(
      this.configService.getOrThrow('AWS_S3_PUBLIC_URL'),
    )[1];

    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: key,
        }),
      );
    } catch (err) {
      console.log('----------- Image Delete Error -----------');
      console.error(err);
      throw new InternalServerErrorException('Failed to delete image');
    }
  }

  async deleteMultipleImages(urls: string[]) {
    const deletePromises = urls.map((u) => this.deleteImage(u));

    return Promise.all(deletePromises);
  }
}
