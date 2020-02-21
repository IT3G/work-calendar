import { Injectable } from '@nestjs/common';
import { FileStorage } from './file-storage.interface';

@Injectable()
export class FileStorageService implements FileStorage {
  putObject(fileName: string, file: Buffer, bucketName?: string): Promise<string> {
    return Promise.resolve('default realisation');
  }

  getObject(objectName: string, bucketName?: string): Promise<Buffer> {
    return Promise.resolve(null);
  }

  removeObject(objectName: string, bucketName?: string): Promise<void> {
    return Promise.resolve();
  }
}
