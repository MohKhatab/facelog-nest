import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import mongoose, { Model, Types } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
import { Interaction } from 'src/interactions/schemas/interaction.schema';

@Injectable()
export class PostsService {
  @InjectModel(Post.name) private readonly postModel: Model<Post>;
  @InjectModel(Interaction.name)
  private readonly interactionModel: Model<Interaction>;

  constructor(private readonly uploadService: UploadService) {}

  async create(
    createPostDto: CreatePostDto,
    userId: string,
    urls: string[],
  ): Promise<Post> {
    const parsedContent = JSON.parse(createPostDto.content) as object;
    const newPost = await this.postModel.create({
      ...createPostDto,
      content: parsedContent,
      poster: userId,
      images: urls,
    });

    return newPost;
  }

  async findAll(userId: Types.ObjectId | string): Promise<Post[]> {
    const posts = await this.postModel
      .find({})
      .populate('poster', 'firstName lastName')
      .lean();

    const postIds = posts.map((p) => p._id);

    const dislikedPostIds = await this.interactionModel
      .find({ postId: { $in: postIds }, userId: userId, type: 'dislike' })
      .distinct('postId');

    const dislikedSet = new Set(dislikedPostIds.map((id) => id.toString()));

    const postsWithLikes = posts.map((post) => ({
      ...post,
      isDisliked: dislikedSet.has(post._id.toString()),
    }));

    return postsWithLikes;
  }

  async findOne(id: string): Promise<Post | null> {
    return await this.postModel.findById(id);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    files: Array<Express.Multer.File>,
    reqUserId: string | mongoose.Types.ObjectId,
  ) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post does not exist');
    if (post.poster.toString() !== reqUserId)
      throw new ForbiddenException('You can only edit your own posts');

    // Check total length of images after edit
    const newImagesCount = files?.length || 0;
    const removedImagesCount = updatePostDto?.imagesToRemove?.length || 0;
    const totalCurrImages = post.images.length;

    const finalImageCount =
      totalCurrImages + newImagesCount - removedImagesCount;

    if (finalImageCount < 1 || finalImageCount > 5) {
      throw new BadRequestException('Posts must have 1-5 images');
    }

    if (updatePostDto.imagesToRemove && updatePostDto.imagesToRemove.length) {
      const imagesToRemove = updatePostDto.imagesToRemove;

      post.images = post.images.filter((img) => !imagesToRemove.includes(img));

      await this.uploadService.deleteMultipleImages(imagesToRemove);
    }

    const uploadItems = files.map((file) => ({
      stream: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
    }));
    if (files) {
      const urls = await this.uploadService.uploadMultipleFiles(uploadItems);
      post.images = [...post.images, ...urls];
    }

    //rest of the updates
    const { title, content } = updatePostDto;
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = JSON.parse(content) as object;
    // if (description !== undefined) post.description = description;

    await post.save();
    return post;
  }

  async remove(id: string) {
    const postToDelete = await this.postModel.findById(id);

    if (!postToDelete) throw new NotFoundException('Post does not exist');

    await this.uploadService.deleteMultipleImages(postToDelete.images);
    await postToDelete.deleteOne();
  }
}
