import { Model } from 'mongoose';
import { Interview } from './interview.schema';
export declare class InterviewsService {
    private interviewModel;
    constructor(interviewModel: Model<Interview>);
    private readonly interviewsData;
    findAll(): Promise<{
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }[]>;
    addCandidateToInterviewByName(interviewName: string, candidateId: string): Promise<{
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }>;
    getInterviewsByPanelist(panelistName: string): {
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }[];
}
