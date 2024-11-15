"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelistService = void 0;
const common_1 = require("@nestjs/common");
let PanelistService = class PanelistService {
    constructor() {
        this.panelists = [
            { name: 'Alice Johnson', email: 'alice@smarttalent.com', password: 'alice@123', expertise: 'Software Engineering', availability: true },
            { name: 'Bob Smith', email: 'bob@smarttalent.com', password: 'bob@123', expertise: 'Data Science', availability: true },
            { name: 'Charlie Brown', email: 'charlie@smarttalent.com', password: 'charlie@123', expertise: 'Project Management', availability: true },
            { name: 'Luke Anthony', email: 'luke@smarttalent.com', password: 'luke@123', expertise: 'Fluid Mechanics', availability: true },
            { name: 'Mark Andrews', email: 'mark@smarttalent.com', password: 'mark@123', expertise: 'Civil Engineering', availability: true }
        ];
    }
    async findAll() {
        return this.panelists;
    }
    assignPanelistToCandidate(candidateId, panelistName) {
        const panelist = this.panelists.find(p => p.name === panelistName);
        if (panelist && panelist.availability) {
            panelist.availability = false;
            return { message: `${panelist.name} assigned to candidate ${candidateId}` };
        }
        else {
            throw new Error('Panelist not available or not found');
        }
    }
    async validatePanelist(email, password) {
        const panelist = this.panelists.find(p => p.email === email);
        if (!panelist) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (password != panelist.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return panelist;
    }
    getPanelistInterviews(panelistName) {
        const allInterviews = [
            { panelist: 'Alice Johnson', position: 'Software Engineer', date: '2024-11-05', candidates: ['John Doe', 'Cindy Smith'] },
            { panelist: 'Bob Smith', position: 'System Analyst', date: '2024-11-10', candidates: ['John Smith', 'Peter Pan'] },
            { panelist: 'Charlie Brown', position: 'Data Scientist', date: '2024-11-15', candidates: ['Peter Pan', 'Paul Suzan'] }
        ];
        return allInterviews.filter(interview => interview.panelist === panelistName);
    }
};
exports.PanelistService = PanelistService;
exports.PanelistService = PanelistService = __decorate([
    (0, common_1.Injectable)()
], PanelistService);
//# sourceMappingURL=panelist.service.js.map