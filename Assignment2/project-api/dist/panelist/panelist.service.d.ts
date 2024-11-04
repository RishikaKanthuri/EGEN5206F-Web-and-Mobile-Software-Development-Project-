import { Panelist } from './interfaces/panelist.interface';
export declare class PanelistService {
    private readonly panelists;
    findAll(): Promise<Panelist[]>;
    assignPanelistToCandidate(candidateId: string, panelistName: string): {
        message: string;
    };
    validatePanelistLogin(email: string): Panelist;
    getPanelistInterviews(panelistName: string): {
        panelist: string;
        position: string;
        date: string;
        candidates: string[];
    }[];
}
