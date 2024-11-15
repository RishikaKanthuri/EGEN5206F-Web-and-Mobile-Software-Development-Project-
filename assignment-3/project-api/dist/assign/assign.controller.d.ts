import { AssignService } from './assign.service';
export declare class AssignController {
    private readonly assignService;
    constructor(assignService: AssignService);
    assignPanelistToCandidate(candidateId: string, panelistName: string): Promise<{
        message: string;
    }>;
}
