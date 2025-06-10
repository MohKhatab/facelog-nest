import mongoose from 'mongoose';
export declare class Comment {
    content: string;
    postId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}
export declare const commentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment, any> & Comment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>, {}> & mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
