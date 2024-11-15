import { PanelistService } from './panelist.service';
export declare class PanelistController {
    private readonly panelistService;
    constructor(panelistService: PanelistService);
    findAll(): Promise<import("./interfaces/panelist.interface").Panelist[]>;
}
