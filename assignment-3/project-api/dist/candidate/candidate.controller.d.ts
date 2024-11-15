import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { InterviewsService } from '../interview/interview.service';
export declare class CandidateController {
    private readonly candidateService;
    private readonly interviewService;
    getCandidateProfileAuth(): string;
    constructor(candidateService: CandidateService, interviewService: InterviewsService);
    register(createCandidateDto: CreateCandidateDto): Promise<import("./interfaces/candidate.interface").Candidate>;
    findAll(): Promise<import("./interfaces/candidate.interface").Candidate[]>;
    updateStatus(id: string, status: string): Promise<import("./interfaces/candidate.interface").Candidate>;
    submitFeedback(feedbackData: any): Promise<{
        message: string;
    }>;
    applyForInterview(interviewName: string, body: {
        email: string;
        education: string;
        skills: string;
        positionApplied: string;
    }): Promise<{
        company: string;
        position: string;
        scheduledDate: Date;
        panelist: string;
        description: string;
        candidates: any[];
    }>;
    loginCandidate(email: string): Promise<import("./interfaces/candidate.interface").Candidate | {
        error: string;
    }>;
    getCandidateProfile(email: string): Promise<import("./interfaces/candidate.interface").Candidate | {
        error: string;
    }>;
    getCandidatesForInterview(positionApplied: string, panelist: string): Promise<import("./interfaces/candidate.interface").Candidate[]>;
}
