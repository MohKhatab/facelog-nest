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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./schemas/post.schema");
const mongoose_2 = require("mongoose");
const upload_service_1 = require("../upload/upload.service");
let PostsService = class PostsService {
    uploadService;
    postModel;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async create(createPostDto, userId, urls) {
        const parsedContent = JSON.parse(createPostDto.content);
        const newPost = await this.postModel.create({
            ...createPostDto,
            content: parsedContent,
            poster: userId,
            images: urls,
        });
        return newPost;
    }
    async findAll() {
        return await this.postModel
            .find({})
            .populate('poster', 'firstName lastName');
    }
    async findOne(id) {
        return await this.postModel.findById(id);
    }
    async update(id, updatePostDto, files, reqUserId) {
        const post = await this.postModel.findById(id);
        if (!post)
            throw new common_1.NotFoundException('Post does not exist');
        if (post.poster.toString() !== reqUserId)
            throw new common_1.ForbiddenException('You can only edit your own posts');
        const newImagesCount = files?.length || 0;
        const removedImagesCount = updatePostDto?.imagesToRemove?.length || 0;
        const totalCurrImages = post.images.length;
        const finalImageCount = totalCurrImages + newImagesCount - removedImagesCount;
        if (finalImageCount < 1 || finalImageCount > 5) {
            throw new common_1.BadRequestException('Posts must have 1-5 images');
        }
        if (updatePostDto.imagesToRemove && updatePostDto.imagesToRemove.length) {
            const imagesToRemove = updatePostDto.imagesToRemove;
            post.images = post.images.filter((img) => !imagesToRemove.includes(img));
            await this.uploadService.deleteMultipleImages(imagesToRemove);
        }
        const uploadItems = files.map((file) => ({
            stream: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
        }));
        if (files) {
            const urls = await this.uploadService.uploadMultipleFiles(uploadItems);
            post.images = [...post.images, ...urls];
        }
        const { title, content } = updatePostDto;
        if (title !== undefined)
            post.title = title;
        if (content !== undefined)
            post.content = JSON.parse(content);
        await post.save();
        return post;
    }
    async remove(id) {
        const postToDelete = await this.postModel.findById(id);
        if (!postToDelete)
            throw new common_1.NotFoundException('Post does not exist');
        await this.uploadService.deleteMultipleImages(postToDelete.images);
        await postToDelete.deleteOne();
    }
};
exports.PostsService = PostsService;
__decorate([
    (0, mongoose_1.InjectModel)(post_schema_1.Post.name),
    __metadata("design:type", mongoose_2.Model)
], PostsService.prototype, "postModel", void 0);
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], PostsService);
//# sourceMappingURL=posts.service.js.map