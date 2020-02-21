import { Injectable } from '@nestjs/common';
import { FileStorage } from './file-storage.interface';

@Injectable()
export class FileStorageService implements FileStorage {
  async putObject(fileName: string, file: Buffer, bucketName?: string): Promise<string> {
    return Promise.resolve('default realisation');
  }
}
