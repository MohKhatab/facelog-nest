import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll(@Param('postId') postId: string) {
    return await this.commentService.getPostComments(postId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() body: CreateCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return (
      await this.commentService.create(body, req.user.sub, postId)
    ).populate({
      path: 'userId',
      select: '-password -email',
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':commentId')
  async delete(
    @Param('commentId') commentId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.commentService.delete(commentId, req.user.sub);
    return { message: 'Comment deleted successfully!' };
  }

  @UseGuards(AuthGuard)
  @Patch(':commentId')
  async edit(
    @Param('commentId') commentId: string,
    @Req() req: AuthenticatedRequest,
    @Body() body: CreateCommentDto,
  ) {
    return await this.commentService.editPost(body, commentId, req.user.sub);
  }
}
