import { InterviewsService } from './interview.service';
export declare class InterviewsController {
    private readonly interviewsService;
    constructor(interviewsService: InterviewsService);
    getAllInterviews(): Promise<{
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }[]>;
    getInterviewsForPanelist(panelistName: string): {
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }[];
}
