import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  @InjectModel(Comment.name)
  private readonly commentModel: Model<Comment>;

  async create(
    createCommentDto: CreateCommentDto,
    userId: string | Types.ObjectId,
    postId: string | Types.ObjectId,
  ) {
    return await this.commentModel.create({
      ...createCommentDto,
      userId,
      postId,
    });
  }

  async delete(
    commentId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) throw new NotFoundException('Comment does not exist');
    if (comment.userId.toString() !== userId)
      throw new ForbiddenException('You can only delete your own comments');

    await comment.deleteOne();
  }

  async getPostComments(postId: string | Types.ObjectId) {
    const postComments = await this.commentModel.find({ postId }).populate({
      path: 'userId',
      select: '-password -email',
    });

    return postComments;
  }

  async editPost(
    createCommentDto: CreateCommentDto,
    commentId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const comment = await this.commentModel.findById(commentId);

    if (!comment)
      throw new NotFoundException('Comment does not exist in the database');
    if (comment.userId.toString() !== userId)
      throw new ForbiddenException('You can only edit your own comments');

    comment.content = createCommentDto.content;
    await comment.save();
    return comment;
  }
}
