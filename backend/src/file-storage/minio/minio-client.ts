import * as Minio from 'minio';
import { MinioConfig } from './minio-config';

let minioClient: Minio.Client;
let minoConfig: MinioConfig;

export function initMinio(config: MinioConfig) {
  minoConfig = config;
  minioClient = new Minio.Client(config);
}

export function getMinioClient() {
  if (!minioClient) {
    throw new Error('Нужно инициализировать модуль');
  }

  return minioClient;
}

export function getMinioConfig() {
  return minoConfig;
}

export async function initBucket(bucketName: string) {
  if (!bucketName) {
    throw new Error('Добавьте bucket');
  }

  const isBucketExists = await minioClient.bucketExists(bucketName);
  if (!isBucketExists) {
    await minioClient.makeBucket(bucketName, 'rus');
  }
}
