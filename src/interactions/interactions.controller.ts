import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';
import { Types } from 'mongoose';

@Controller('posts')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @UseGuards(AuthGuard)
  @Post('/:postId/:interaction')
  async create(
    @Param('postId') postId: string,
    @Param('interaction') interaction: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const interactionTypes = ['dislike'];

    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException('Invalid post ID');
    }

    if (!interactionTypes.includes(interaction))
      throw new BadRequestException(
        `Unknown interaction ${interaction} expected ${interactionTypes.join(' ')}`.trim(),
      );

    await this.interactionsService.addInteraction(
      postId,
      req.user.sub,
      interaction as 'dislike',
    );

    return { _id: postId };
  }

  @UseGuards(AuthGuard)
  @Delete('/:postId/:interaction')
  async delete(
    @Param('postId') postId: string,
    @Param('interaction') interaction: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const interactionTypes = ['dislike'];

    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException('Invalid post ID');
    }

    if (!interactionTypes.includes(interaction))
      throw new BadRequestException(
        `Unknown interaction ${interaction} expected ${interactionTypes.join(' ')}`.trim(),
      );

    await this.interactionsService.removeInteraction(
      postId,
      req.user.sub,
      interaction as 'dislike',
    );

    return { _id: postId };
  }
}
