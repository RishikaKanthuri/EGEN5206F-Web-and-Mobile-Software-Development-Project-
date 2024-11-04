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
exports.CandidateService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CandidateService = class CandidateService {
    constructor(candidateModel) {
        this.candidateModel = candidateModel;
    }
    async create(createCandidateDto) {
        const createdCandidate = new this.candidateModel(createCandidateDto);
        return createdCandidate.save();
    }
    async findAll() {
        return this.candidateModel.find().exec();
    }
    async getCandidatesByPositionAndPanelist(positionApplied, panelist) {
        return this.candidateModel.find({ positionApplied, panelist }).exec();
    }
    async updateStatus(id, status) {
        return this.candidateModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
    }
    async updateCandidateResult(feedbackData) {
        const candidate = await this.candidateModel.findOne({ name: feedbackData.candidateName });
        if (!candidate) {
            throw new common_1.NotFoundException('Candidate not found');
        }
        candidate.result = feedbackData.recommendation;
        await candidate.save();
        return { message: 'Feedback submitted successfully' };
    }
    async updateCandidatePosition(candidateId, positionApplied) {
        return this.candidateModel.findByIdAndUpdate(candidateId, { positionApplied }, { new: true }).exec();
    }
    async updateCandidateDetailsByEmail(email, updates) {
        return this.candidateModel.findOneAndUpdate({ email }, updates, { new: true }).exec();
    }
    async getCandidateByEmail(email) {
        return this.candidateModel.findOne({ email }).exec();
    }
};
exports.CandidateService = CandidateService;
exports.CandidateService = CandidateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Candidate')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CandidateService);
//# sourceMappingURL=candidate.service.js.map