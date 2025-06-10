import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true, default: 0 })
  commentCount: number;

  @Prop({ type: Number, required: true, default: 0 })
  interactionCount: number;

  @Prop({ type: Object, required: true })
  content: object;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  poster: mongoose.Types.ObjectId;

  @Prop([{ type: String }])
  images: string[];
}

export const postSchema = SchemaFactory.createForClass(Post);
