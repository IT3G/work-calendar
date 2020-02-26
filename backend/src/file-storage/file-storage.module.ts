import { Module, Provider } from '@nestjs/common';
import { getConfig } from '../config/config';
import { FileStorageService } from './services/file-storage.service';
import { MinioStorageService } from './services/minio-storage.service';

/**
 * Подмена реализации файлового хранилища на выбранную в настройках.
 */
const config = getConfig();
const fileStorageProvider: Provider = {
  provide: FileStorageService,
  useValue: config.FEATURE_FILE_STORAGE === 'YES' ? new MinioStorageService() : new FileStorageService()
};

@Module({
  providers: [fileStorageProvider],
  exports: [fileStorageProvider]
})
export class FileStorageModule {}
