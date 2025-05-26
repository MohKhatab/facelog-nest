import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly uploadService: UploadService,
  ) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // create(
  //   @Body() createPostDto: CreatePostDto,
  //   @Req() req: AuthenticatedRequest,
  // ) {
  //   const userData = req.user;
  //   return this.postsService.create(createPostDto, String(userData.sub));
  // }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    if (files.length < 1) {
      throw new BadRequestException('Please upload at least one image');
    }

    const uploadItems = files.map((file) => ({
      stream: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
    }));

    const urls = await this.uploadService.uploadMultipleFiles(uploadItems);

    const userData = req.user;
    return this.postsService.create(createPostDto, String(userData.sub), urls);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
