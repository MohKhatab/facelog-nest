import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { TokenPayload } from './entitites/token-payload.entity';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  @InjectModel('User') private readonly userModel: Model<User>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email: email }).lean();
    if (!user)
      throw new UnauthorizedException('Check email or password then try again');

    const isMatching = await compare(password, user.password);

    if (!isMatching)
      throw new UnauthorizedException('Check email or password then try again');

    const payload: TokenPayload = {
      sub: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
