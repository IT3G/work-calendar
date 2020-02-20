import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { getMinioClient, getMinioConfig } from '../minio/minio-client';

@Injectable()
export class FileStoreService {
  private readonly minioClient: Minio.Client = getMinioClient();
  private readonly config = getMinioConfig();
  async putObject(fileName: string, file: Buffer, bucketName = this.config.bucketName) {
    await this.minioClient.putObject(bucketName, fileName, file, {});
  }
}
