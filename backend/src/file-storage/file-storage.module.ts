import { Module, DynamicModule } from '@nestjs/common';
import * as Minio from 'minio';
import { FileStoreService } from './services/file-store.service';
import { MinioConfig } from './minio/minio-config';
import { initMinio } from './minio/minio-client';

@Module({})
export class FileStorageModule {
  public static forRoot(config: MinioConfig): DynamicModule {
    initMinio(config);
    return {
      module: FileStorageModule,
      providers: [FileStoreService],
      exports: [FileStoreService]
    };
  }
}
