import mongoose from 'mongoose';
export declare class Interaction {
    type: string;
    postId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}
export declare const interactionSchema: mongoose.Schema<Interaction, mongoose.Model<Interaction, any, any, any, mongoose.Document<unknown, any, Interaction, any> & Interaction & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Interaction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Interaction>, {}> & mongoose.FlatRecord<Interaction> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
