import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser({ email, password }: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
    validateToken({ token }: {
        token: string;
    }): Promise<{
        isValid: boolean;
    }>;
}
