import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import { UploadService } from 'src/upload/upload.service';
export declare class PostsService {
    private readonly uploadService;
    private readonly postModel;
    constructor(uploadService: UploadService);
    create(createPostDto: CreatePostDto, userId: string, urls: string[]): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post | null>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<(import("mongoose").Document<unknown, {}, Post, {}> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<void>;
}
