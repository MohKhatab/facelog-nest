import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class PostsService {
  @InjectModel(Post.name) private readonly postModel: Model<Post>;

  constructor(private readonly uploadService: UploadService) {}

  async create(
    createPostDto: CreatePostDto,
    userId: string,
    urls: string[],
  ): Promise<Post> {
    const newPost = await this.postModel.create({
      ...createPostDto,
      poster: userId,
      images: urls,
    });

    return newPost;
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel
      .find({})
      .populate('poster', 'firstName lastName');
  }

  async findOne(id: string): Promise<Post | null> {
    return await this.postModel.findById(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const postToDelete = await this.postModel.findById(id);

    if (!postToDelete) throw new NotFoundException('Post does not exist');

    await this.uploadService.deleteMultipleImages(postToDelete.images);
    await postToDelete.deleteOne();
  }
}
