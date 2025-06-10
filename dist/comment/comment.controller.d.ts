import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAll(postId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment, {}> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    create(postId: string, body: CreateCommentDto, req: AuthenticatedRequest): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment, {}> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, never>>;
    delete(commentId: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    edit(commentId: string, req: AuthenticatedRequest, body: CreateCommentDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/comment.schema").Comment, {}> & import("./schemas/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
