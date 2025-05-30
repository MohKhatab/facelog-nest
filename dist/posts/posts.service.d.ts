import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import mongoose from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
export declare class PostsService {
    private readonly uploadService;
    private readonly postModel;
    constructor(uploadService: UploadService);
    create(createPostDto: CreatePostDto, userId: string, urls: string[]): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post | null>;
    update(id: string, updatePostDto: UpdatePostDto, files: Array<Express.Multer.File>, reqUserId: string | mongoose.Types.ObjectId): Promise<mongoose.Document<unknown, {}, Post, {}> & Post & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
