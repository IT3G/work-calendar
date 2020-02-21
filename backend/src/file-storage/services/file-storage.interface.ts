export interface FileStorage {
  putObject(fileName: string, file: Buffer, bucketName?: string): Promise<string>;
}
