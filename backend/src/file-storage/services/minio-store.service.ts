import { Injectable, Logger } from '@nestjs/common';
import * as Minio from 'minio';
import { getConfig } from '../../config/config';
import { FileStorage } from './file-storage.interface';

@Injectable()
export class MinioStoreService implements FileStorage {
  private minioClient: Minio.Client;
  private readonly logger = new Logger('FileStoreService');
  private config = getConfig();

  constructor() {
    this.init();
  }

  async putObject(fileName: string, file: Buffer, bucketName = this.config.MINIO_BUCKET_NAME): Promise<string> {
    try {
      return await this.minioClient.putObject(bucketName, fileName, file, {});
    } catch (e) {
      this.logger.error('minio putObject', e.stack);
    }
  }

  private async init() {
    try {
      this.minioClient = new Minio.Client({
        endPoint: this.config.MINIO_END_POINT,
        port: +this.config.MINIO_PORT,
        useSSL: !!this.config.MINIO_USE_SSL,
        accessKey: this.config.MINIO_ACCESS_KEY,
        secretKey: this.config.MINIO_SECRET_KEY
      });

      await this.initBucket(this.config.MINIO_BUCKET_NAME);
    } catch (error) {}
  }

  private async initBucket(bucketName: string) {
    const isBucketExists = await this.minioClient.bucketExists(bucketName);
    if (!isBucketExists) {
      await this.minioClient.makeBucket(bucketName, 'rus');
    }
  }
}
