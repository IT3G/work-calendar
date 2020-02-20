import { DynamicModule, Module } from '@nestjs/common';
import { initBucket, initMinio } from './minio/minio-client';
import { MinioConfig } from './minio/minio-config';
import { FileStoreService } from './services/file-store.service';

@Module({
  providers: [FileStoreService],
  exports: [FileStoreService]
})
export class FileStorageModule {
  public static forRoot(config: MinioConfig): DynamicModule {
    initMinio(config);

    initBucket(config.bucketName);

    return {
      module: FileStorageModule,
      providers: [FileStoreService],
      exports: [FileStoreService]
    };
  }
}
