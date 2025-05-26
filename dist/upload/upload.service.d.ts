import { ConfigService } from '@nestjs/config';
export declare class UploadService {
    private readonly configService;
    private readonly s3Client;
    constructor(configService: ConfigService);
    uploadFile(fileName: string, file: Buffer): Promise<string>;
    uploadMultipleFiles(files: Array<{
        stream: Buffer;
        fileName: string;
    }>): Promise<string[]>;
    deleteImage(url: string): Promise<void>;
    deleteMultipleImages(urls: string[]): Promise<void[]>;
}
