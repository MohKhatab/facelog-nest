import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './schemas/post.schema';
import { AuthModule } from 'src/auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from 'src/upload/upload.module';
import {
  Interaction,
  interactionSchema,
} from 'src/interactions/schemas/interaction.schema';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UploadModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: postSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Interaction.name,
        schema: interactionSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
