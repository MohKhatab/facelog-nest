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
        const newPost = await this.postModel.create({
            ...createPostDto,
            poster: userId,
            images: urls,
        });
        return newPost;
    }
    async findAll() {
        return await this.postModel.find({});
    }
    async findOne(id) {
        return await this.postModel.findById(id);
    }
    async update(id, updatePostDto) {
        return await this.postModel.findByIdAndUpdate(id, updatePostDto, {
            new: true,
        });
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