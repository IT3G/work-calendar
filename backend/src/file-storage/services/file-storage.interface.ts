export interface FileStorage {
  putObject(fileName: string, file: Buffer, bucketName?: string): Promise<string>;

  getObject(objectName: string, bucketName?: string): Promise<Buffer>;

  removeObject(objectName: string, bucketName?: string): Promise<void>;
}
