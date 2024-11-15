"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const interview_schema_1 = require("./interview.schema");
let InterviewsService = class InterviewsService {
    constructor(interviewModel) {
        this.interviewModel = interviewModel;
        this.interviewsData = [
            {
                company: 'Google',
                position: 'Software Engineer',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Alice Johnson',
                description: 'Google is looking for skilled Software Engineers with experience in cloud computing and system design.',
                candidates: []
            },
            {
                company: 'Facebook',
                position: 'System Analyst',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Bob Smith',
                description: 'Facebook is seeking experienced System Analysts to join their team. As a System Analyst, you will be responsible for evaluating and implementing IT systems to meet business needs.',
                candidates: []
            },
            {
                company: 'ABC Corporation',
                position: 'Mechanical Engineer',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Luke Anthony',
                description: 'ABC Corporation is hiring Mechanical Engineers to design, develop, and oversee the production of mechanical systems in various industries. Candidates should have experience in CAD and industrial machinery',
                candidates: []
            }, {
                company: 'XYZ Construction',
                position: 'Civil Engineer',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Mark Andrews',
                description: 'XYZ Construction is looking for Civil Engineers with expertise in structural design and urban planning. Join a team of professionals working on large-scale infrastructure projects.',
                candidates: []
            },
            {
                company: 'DEF Electronics',
                position: 'Electronics Engineer',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Charlie Brown',
                description: 'DEF Electronics is hiring skilled Electronics Engineers with a focus on embedded systems, circuit design, and PCB development. Candidates should have knowledge of microcontrollers and signal processing.',
                candidates: []
            },
            {
                company: 'GHI Power Systems',
                position: 'Electrical Engineer',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Charlie Brown',
                description: 'GHI Power Systems is seeking Electrical Engineers to work on power distribution and grid management projects. Expertise in high-voltage systems and electrical safety is required.',
                candidates: []
            },
            {
                company: 'JKL Financial Services',
                position: 'Accountant',
                scheduledDate: new Date('2023-12-01T10:00:00'),
                panelist: 'Alice Johnson',
                description: 'JKL Financial Services is looking for experienced Accountants to manage financial reports, audits, and tax filings. Strong skills in financial analysis and compliance are a must.',
                candidates: []
            },
        ];
    }
    async findAll() {
        return this.interviewsData;
    }
    async addCandidateToInterviewByName(interviewName, candidateId) {
        const interview = this.interviewsData.find((interview) => interview.position.toLowerCase() === interviewName.toLowerCase());
        if (!interview) {
            console.log(`Interview with name ${interviewName} not found`);
            return null;
        }
        if (!interview.candidates.includes(candidateId)) {
            interview.candidates.push(candidateId);
            console.log(`Candidate ${candidateId} added to interview ${interviewName}`);
        }
        else {
            console.log(`Candidate ${candidateId} is already part of the interview ${interviewName}`);
        }
        return interview;
    }
    getInterviewsByPanelist(panelistName) {
        return this.interviewsData.filter(interview => interview.panelist === panelistName);
    }
};
exports.InterviewsService = InterviewsService;
exports.InterviewsService = InterviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(interview_schema_1.Interview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InterviewsService);
//# sourceMappingURL=interview.service.js.map