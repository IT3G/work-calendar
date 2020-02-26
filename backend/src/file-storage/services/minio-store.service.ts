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
      throw e;
    }
  }

  async getObject(objectName: string, bucketName = this.config.MINIO_BUCKET_NAME): Promise<Buffer> {
    try {
      const file = await this.minioClient.getObject(bucketName, objectName);

      return new Promise((res, rej) => {
        const bufs = [];
        file.on('data', function(d) {
          bufs.push(d);
        });
        file.on('end', function() {
          res(Buffer.concat(bufs));
        });
      });
    } catch (e) {
      this.logger.error('minio getObject', e.stack);
      throw e;
    }
  }

  async removeObject(objectName: string, bucketName = this.config.MINIO_BUCKET_NAME) {
    try {
      return await this.minioClient.removeObject(bucketName, objectName);
    } catch (e) {
      this.logger.error('minio deleteObject', e.stack);
      throw e;
    }
  }

  private async init(): Promise<void> {
    try {
      this.minioClient = new Minio.Client({
        endPoint: this.config.MINIO_END_POINT,
        port: +this.config.MINIO_PORT,
        useSSL: this.config.MINIO_USE_SSL === 'YES',
        accessKey: this.config.MINIO_ACCESS_KEY,
        secretKey: this.config.MINIO_SECRET_KEY
      });

      await this.initBucket(this.config.MINIO_BUCKET_NAME);
    } catch (e) {
      this.logger.error('minio not init', e.stack);
    }
  }

  private async initBucket(bucketName: string): Promise<void> {
    const isBucketExists = await this.minioClient.bucketExists(bucketName);
    if (!isBucketExists) {
      await this.minioClient.makeBucket(bucketName, 'rus');
    }
  }
}
