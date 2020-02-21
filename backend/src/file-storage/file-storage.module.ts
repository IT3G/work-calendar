import { Module, Provider } from '@nestjs/common';
import { getConfig } from '../config/config';
import { FileStorageService } from './services/file-storage.service';
import { MinioStoreService } from './services/minio-store.service';

const config = getConfig();
const fileStorageProvider: Provider = {
  provide: FileStorageService,
  useValue: config.FEATURE_FILE_STORAGE === 'YES' ? new MinioStoreService() : new FileStorageService()
};

@Module({
  providers: [fileStorageProvider],
  exports: [fileStorageProvider]
})
export class FileStorageModule {}
