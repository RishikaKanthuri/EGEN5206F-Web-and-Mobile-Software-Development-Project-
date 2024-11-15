import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Candidate } from '../candidate/schemas/candidate.schema';
import { Panelist } from '../panelist/panelist.schema';
import { PanelistService } from '../panelist/panelist.service';
export declare class AuthService {
    private panelistService;
    private jwtService;
    private candidateModel;
    private panelistModel;
    constructor(panelistService: PanelistService, jwtService: JwtService, candidateModel: Model<Candidate>, panelistModel: Model<Panelist>);
    validateCandidate(email: string, password: string): Promise<any>;
    login(user: any, role: string): Promise<{
        access_token: string;
    }>;
}
