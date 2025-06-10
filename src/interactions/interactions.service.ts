import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interaction } from './schemas/interaction.schema';
import mongoose, { Error, Model } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';

@Injectable()
export class InteractionsService {
  @InjectModel(Interaction.name)
  private readonly interactionModel: Model<Interaction>;
  @InjectModel(Post.name) private readonly postModel: Model<Post>;

  async addInteraction(
    postId: mongoose.Types.ObjectId | string,
    userId: mongoose.Types.ObjectId | string,
    type: 'dislike',
  ) {
    try {
      const interaction = await this.interactionModel.create({
        postId,
        userId,
        type,
      });

      const post = await this.postModel.updateOne(
        { _id: postId },
        { $inc: { interactionCount: 1 } },
      );

      if (!post) throw new NotFoundException('Could not find post');

      return interaction;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException('Invalid interaction data');
      }

      throw new InternalServerErrorException('Failed to add interaction');
    }
  }

  async removeInteraction(
    postId: mongoose.Types.ObjectId | string,
    userId: mongoose.Types.ObjectId | string,
    type: 'dislike',
  ) {
    const deleteResult = await this.interactionModel.deleteOne({
      postId,
      userId,
      type,
    });

    if (!deleteResult.deletedCount)
      throw new NotFoundException('Could not find interaction');

    const post = await this.postModel.updateOne(
      { _id: postId },
      { $inc: { interactionCount: -1 } },
    );

    if (!post) throw new NotFoundException('Could not find post');

    return postId;
  }
}
