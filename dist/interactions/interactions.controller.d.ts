import { InteractionsService } from './interactions.service';
import { AuthenticatedRequest } from 'src/utils/AuthenticatedRequest';
export declare class InteractionsController {
    private readonly interactionsService;
    constructor(interactionsService: InteractionsService);
    create(postId: string, interaction: string, req: AuthenticatedRequest): Promise<{
        _id: string;
    }>;
    delete(postId: string, interaction: string, req: AuthenticatedRequest): Promise<{
        _id: string;
    }>;
}
