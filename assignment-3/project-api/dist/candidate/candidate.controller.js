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
exports.CandidateController = void 0;
const common_1 = require("@nestjs/common");
const candidate_service_1 = require("./candidate.service");
const create_candidate_dto_1 = require("./dto/create-candidate.dto");
const interview_service_1 = require("../interview/interview.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_enum_1 = require("../auth/roles.enum");
let CandidateController = class CandidateController {
    constructor(candidateService, interviewService) {
        this.candidateService = candidateService;
        this.interviewService = interviewService;
    }
    async getCandidateProfile(email) {
        const candidate = await this.candidateService.getCandidateByEmail(email);
        if (!candidate) {
            throw new common_1.NotFoundException('Candidate not found');
        }
        return candidate;
    }
    async register(createCandidateDto) {
        return this.candidateService.create(createCandidateDto);
    }
    async findAll() {
        return this.candidateService.findAll();
    }
    async updateStatus(id, status) {
        return this.candidateService.updateStatus(id, status);
    }
    async submitFeedback(feedbackData) {
        return this.candidateService.updateCandidateResult(feedbackData);
    }
    async applyForInterview(interviewName, body) {
        const { email, education, skills, positionApplied } = body;
        const candidate = await this.candidateService.updateCandidateDetailsByEmail(email, {
            education,
            skills,
            positionApplied,
        });
        if (!candidate) {
            throw new common_1.NotFoundException(`Candidate not found`);
        }
        const updatedInterview = this.interviewService.addCandidateToInterviewByName(interviewName, candidate._id.toString());
        if (!updatedInterview) {
            throw new common_1.NotFoundException(`Interview with name ${interviewName} not found`);
        }
        return updatedInterview;
    }
    async loginCandidate(email) {
        const candidate = await this.candidateService.getCandidateByEmail(email);
        if (!candidate) {
            return { error: 'Candidate not found' };
        }
        return candidate;
    }
    async getCandidatesForInterview(positionApplied, panelist) {
        return this.candidateService.getCandidatesByPositionAndPanelist(positionApplied, panelist);
    }
};
exports.CandidateController = CandidateController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Candidate),
    (0, common_1.Get)(':email/profile'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "getCandidateProfile", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_candidate_dto_1.CreateCandidateDto]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('feedback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "submitFeedback", null);
__decorate([
    (0, common_1.Post)('apply/:interviewName'),
    __param(0, (0, common_1.Param)('interviewName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "applyForInterview", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "loginCandidate", null);
__decorate([
    (0, common_1.Post)('interview-candidates'),
    __param(0, (0, common_1.Body)('positionApplied')),
    __param(1, (0, common_1.Body)('panelist')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CandidateController.prototype, "getCandidatesForInterview", null);
exports.CandidateController = CandidateController = __decorate([
    (0, common_1.Controller)('candidates'),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService,
        interview_service_1.InterviewsService])
], CandidateController);
//# sourceMappingURL=candidate.controller.js.map