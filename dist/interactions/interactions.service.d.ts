import { Interaction } from './schemas/interaction.schema';
import mongoose from 'mongoose';
export declare class InteractionsService {
    private readonly interactionModel;
    private readonly postModel;
    addInteraction(postId: mongoose.Types.ObjectId | string, userId: mongoose.Types.ObjectId | string, type: 'dislike'): Promise<mongoose.Document<unknown, {}, Interaction, {}> & Interaction & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    removeInteraction(postId: mongoose.Types.ObjectId | string, userId: mongoose.Types.ObjectId | string, type: 'dislike'): Promise<string | mongoose.Types.ObjectId>;
}
