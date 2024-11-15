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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateSchema = exports.Candidate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Candidate = class Candidate {
};
exports.Candidate = Candidate;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Candidate.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Candidate.prototype, "zip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'No position Applied' }),
    __metadata("design:type", String)
], Candidate.prototype, "positionApplied", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Candidate.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Candidate.prototype, "education", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Candidate.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Candidate.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Pending' }),
    __metadata("design:type", String)
], Candidate.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Pending' }),
    __metadata("design:type", String)
], Candidate.prototype, "result", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'Not Assigned' }),
    __metadata("design:type", String)
], Candidate.prototype, "panelist", void 0);
exports.Candidate = Candidate = __decorate([
    (0, mongoose_1.Schema)()
], Candidate);
exports.CandidateSchema = mongoose_1.SchemaFactory.createForClass(Candidate);
//# sourceMappingURL=candidate.schema.js.map