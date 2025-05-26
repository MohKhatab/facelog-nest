import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenPayload } from './entitites/token-payload.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader && authHeader?.startsWith('Bearer '))
      throw new ForbiddenException(
        'Please provide a token in the authorization header',
      );

    const token = authHeader?.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(token!, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request['user'] = payload;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException(
        'Please provide a token that is valid and has sufficient permissions',
      );
    }

    return true;
  }
}
