import * as Minio from 'minio';
import { MinioConfig } from './minio-config';

let minioClient: Minio.Client;

export function initMinio(config: MinioConfig) {
  minioClient = new Minio.Client(config);
}

export function getMinioClient() {
  if (!minioClient) {
    throw new Error('Нужно инициализировать модуль');
  }

  return minioClient;
}
