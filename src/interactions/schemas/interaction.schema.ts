import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Interaction {
  @Prop({ type: String, enum: ['dislike'], required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}

export const interactionSchema = SchemaFactory.createForClass(Interaction);

interactionSchema.index({ userId: 1, postId: 1, type: 1 }, { unique: true });
interactionSchema.index({ postId: 1, type: 1 });
interactionSchema.index({ userId: 1, type: 1 });
