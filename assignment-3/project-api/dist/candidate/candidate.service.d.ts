import { Model } from 'mongoose';
import { Candidate } from './interfaces/candidate.interface';
import { CreateCandidateDto } from './dto/create-candidate.dto';
export declare class CandidateService {
    private readonly candidateModel;
    constructor(candidateModel: Model<Candidate>);
    create(createCandidateDto: CreateCandidateDto): Promise<Candidate>;
    findAll(): Promise<Candidate[]>;
    getCandidatesByPositionAndPanelist(positionApplied: string, panelist: string): Promise<Candidate[]>;
    updateStatus(id: string, status: string): Promise<Candidate>;
    updateCandidateResult(feedbackData: any): Promise<{
        message: string;
    }>;
    updateCandidatePosition(candidateId: string, positionApplied: string): Promise<Candidate>;
    updateCandidateDetailsByEmail(email: string, updates: {
        education: string;
        skills: string;
        positionApplied: string;
    }): Promise<Candidate>;
    getCandidateByEmail(email: string): Promise<Candidate>;
}
