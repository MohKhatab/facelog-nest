import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import mongoose, { Types } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
export declare class PostsService {
    private readonly uploadService;
    private readonly postModel;
    private readonly interactionModel;
    constructor(uploadService: UploadService);
    create(createPostDto: CreatePostDto, userId: string, urls: string[]): Promise<Post>;
    findAll(userId: Types.ObjectId | string): Promise<Post[]>;
    findOne(id: string): Promise<Post | null>;
    update(id: string, updatePostDto: UpdatePostDto, files: Array<Express.Multer.File>, reqUserId: string | mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, {}, Post, {}> & Post & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
