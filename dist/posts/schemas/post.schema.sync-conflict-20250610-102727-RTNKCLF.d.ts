import mongoose from 'mongoose';
export declare class Post {
    title: string;
    content: object;
    poster: mongoose.Types.ObjectId;
    images: string[];
}
export declare const postSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, mongoose.Document<unknown, any, Post, any> & Post & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post, mongoose.Document<unknown, {}, mongoose.FlatRecord<Post>, {}> & mongoose.FlatRecord<Post> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
