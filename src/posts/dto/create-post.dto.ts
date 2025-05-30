import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ message: 'Content of the body must be a stringified json' })
  content: string;

  // @IsNotEmpty()
  // @IsString()
  // description: string;
}
