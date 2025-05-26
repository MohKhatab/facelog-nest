import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';
import { UploadService } from 'src/upload/upload.service';
export declare class PostsController {
    private readonly postsService;
    private readonly uploadService;
    constructor(postsService: PostsService, uploadService: UploadService);
    create(createPostDto: CreatePostDto, req: AuthenticatedRequest, files: Array<Express.Multer.File>): Promise<import("./schemas/post.schema").Post>;
    findAll(): Promise<import("./schemas/post.schema").Post[]>;
    findOne(id: string): Promise<import("./schemas/post.schema").Post | null>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/post.schema").Post, {}> & import("./schemas/post.schema").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
