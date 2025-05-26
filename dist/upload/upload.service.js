"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let UploadService = class UploadService {
    configService;
    s3Client;
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: configService.getOrThrow('AWS_S3_REGION'),
            endpoint: configService.getOrThrow('AWS_S3_ENDPOINT'),
            credentials: {
                accessKeyId: configService.getOrThrow('AWS_S3_ACCESS_KEY_ID'),
                secretAccessKey: configService.getOrThrow('AWS_S3_ACCESS_KEY_SECRET'),
            },
            forcePathStyle: true,
        });
    }
    async uploadFile(fileName, file) {
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
                Key: fileName,
                Body: file,
            }));
        }
        catch (err) {
            console.log('----------- Image Upload Error -----------');
            console.error(err);
            throw new common_1.InternalServerErrorException('Failed to upload image');
        }
        return this.configService.get('AWS_S3_PUBLIC_URL') + fileName;
    }
    async uploadMultipleFiles(files) {
        const uploadPromises = files.map((file) => this.uploadFile(file.fileName, file.stream));
        return Promise.all(uploadPromises);
    }
    async deleteImage(url) {
        const key = url.split(this.configService.getOrThrow('AWS_S3_PUBLIC_URL'))[1];
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
                Key: key,
            }));
        }
        catch (err) {
            console.log('----------- Image Delete Error -----------');
            console.error(err);
            throw new common_1.InternalServerErrorException('Failed to delete image');
        }
    }
    async deleteMultipleImages(urls) {
        const deletePromises = urls.map((u) => this.deleteImage(u));
        return Promise.all(deletePromises);
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map