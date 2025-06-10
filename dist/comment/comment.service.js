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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const comment_schema_1 = require("./schemas/comment.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CommentService = class CommentService {
    commentModel;
    async create(createCommentDto, userId, postId) {
        return await this.commentModel.create({
            ...createCommentDto,
            userId,
            postId,
        });
    }
    async delete(commentId, userId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment)
            throw new common_1.NotFoundException('Comment does not exist');
        if (comment.userId.toString() !== userId)
            throw new common_1.ForbiddenException('You can only delete your own comments');
        await comment.deleteOne();
    }
    async getPostComments(postId) {
        const postComments = await this.commentModel.find({ postId }).populate({
            path: 'userId',
            select: '-password -email',
        });
        return postComments;
    }
    async editPost(createCommentDto, commentId, userId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment)
            throw new common_1.NotFoundException('Comment does not exist in the database');
        if (comment.userId.toString() !== userId)
            throw new common_1.ForbiddenException('You can only edit your own comments');
        comment.content = createCommentDto.content;
        await comment.save();
        return comment;
    }
};
exports.CommentService = CommentService;
__decorate([
    (0, mongoose_2.InjectModel)(comment_schema_1.Comment.name),
    __metadata("design:type", mongoose_1.Model)
], CommentService.prototype, "commentModel", void 0);
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)()
], CommentService);
//# sourceMappingURL=comment.service.js.map