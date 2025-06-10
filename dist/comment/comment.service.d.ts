import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { Types } from 'mongoose';
export declare class CommentService {
    private readonly commentModel;
    create(createCommentDto: CreateCommentDto, userId: string | Types.ObjectId, postId: string | Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Comment, {}> & Comment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    delete(commentId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<void>;
    getPostComments(postId: string | Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    editPost(createCommentDto: CreateCommentDto, commentId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Comment, {}> & Comment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
