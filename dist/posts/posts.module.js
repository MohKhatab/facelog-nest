"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const posts_controller_1 = require("./posts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const post_schema_1 = require("./schemas/post.schema");
const auth_module_1 = require("../auth/auth/auth.module");
const config_1 = require("@nestjs/config");
const upload_module_1 = require("../upload/upload.module");
const interaction_schema_1 = require("../interactions/schemas/interaction.schema");
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule,
            upload_module_1.UploadModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: post_schema_1.Post.name,
                    schema: post_schema_1.postSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: interaction_schema_1.Interaction.name,
                    schema: interaction_schema_1.interactionSchema,
                },
            ]),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService],
    })
], PostsModule);
//# sourceMappingURL=posts.module.js.map