import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly userModel;
    constructor(jwtService: JwtService, configService: ConfigService);
    login(email: string, password: string): Promise<string>;
}
