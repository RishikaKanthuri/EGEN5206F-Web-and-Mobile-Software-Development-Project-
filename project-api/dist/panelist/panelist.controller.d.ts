import { PanelistService } from './panelist.service';
export declare class PanelistController {
    private readonly panelistService;
    constructor(panelistService: PanelistService);
    getPanelistInterviews(): string;
    findAll(): Promise<import("./interfaces/panelist.interface").Panelist[]>;
    getInterviews(panelistName: string): {
        panelist: string;
        position: string;
        date: string;
        candidates: string[];
    }[];
}
