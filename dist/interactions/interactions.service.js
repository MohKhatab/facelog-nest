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
exports.InteractionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const interaction_schema_1 = require("./schemas/interaction.schema");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("../posts/schemas/post.schema");
let InteractionsService = class InteractionsService {
    interactionModel;
    postModel;
    async addInteraction(postId, userId, type) {
        try {
            const interaction = await this.interactionModel.create({
                postId,
                userId,
                type,
            });
            const post = await this.postModel.updateOne({ _id: postId }, { $inc: { interactionCount: 1 } });
            if (!post)
                throw new common_1.NotFoundException('Could not find post');
            return interaction;
        }
        catch (error) {
            if (error instanceof mongoose_2.default.Error.ValidationError) {
                throw new common_1.BadRequestException('Invalid interaction data');
            }
            throw new common_1.InternalServerErrorException('Failed to add interaction');
        }
    }
    async removeInteraction(postId, userId, type) {
        const deleteResult = await this.interactionModel.deleteOne({
            postId,
            userId,
            type,
        });
        if (!deleteResult.deletedCount)
            throw new common_1.NotFoundException('Could not find interaction');
        const post = await this.postModel.updateOne({ _id: postId }, { $inc: { interactionCount: -1 } });
        if (!post)
            throw new common_1.NotFoundException('Could not find post');
        return postId;
    }
};
exports.InteractionsService = InteractionsService;
__decorate([
    (0, mongoose_1.InjectModel)(interaction_schema_1.Interaction.name),
    __metadata("design:type", mongoose_2.Model)
], InteractionsService.prototype, "interactionModel", void 0);
__decorate([
    (0, mongoose_1.InjectModel)(post_schema_1.Post.name),
    __metadata("design:type", mongoose_2.Model)
], InteractionsService.prototype, "postModel", void 0);
exports.InteractionsService = InteractionsService = __decorate([
    (0, common_1.Injectable)()
], InteractionsService);
//# sourceMappingURL=interactions.service.js.map