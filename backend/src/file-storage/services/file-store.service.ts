import { Injectable } from '@nestjs/common';
import { getMinioClient } from '../minio/minio-client';
import * as Minio from 'minio';

@Injectable({})
export class FileStoreService {
  private readonly minioClient: Minio.Client = getMinioClient();
}
