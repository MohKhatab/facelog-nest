import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Interaction, interactionSchema } from './schemas/interaction.schema';
import { Post, postSchema } from 'src/posts/schemas/post.schema';
import { AuthModule } from 'src/auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Interaction.name,
        schema: interactionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: postSchema,
      },
    ]),
  ],
  controllers: [InteractionsController],
  providers: [InteractionsService],
})
export class InteractionsModule {}
