import { Request } from 'express';
import { TokenPayload } from 'src/auth/auth/entitites/token-payload.entity';
export interface AuthenticatedRequest extends Request {
    user: TokenPayload;
}
