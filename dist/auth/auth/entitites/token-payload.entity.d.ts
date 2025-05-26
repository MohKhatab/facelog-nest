import mongoose from 'mongoose';
export declare class TokenPayload {
    sub: string | mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
}
