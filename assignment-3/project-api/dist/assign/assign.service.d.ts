import { Model } from 'mongoose';
import { Candidate } from '../candidate/interfaces/candidate.interface';
import { PanelistService } from '../panelist/panelist.service';
export declare class AssignService {
    private readonly candidateModel;
    private readonly panelistService;
    constructor(candidateModel: Model<Candidate>, panelistService: PanelistService);
    assignPanelist(candidateId: string, panelistName: string): Promise<{
        message: string;
    }>;
}
