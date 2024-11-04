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
exports.AssignController = void 0;
const common_1 = require("@nestjs/common");
const assign_service_1 = require("./assign.service");
let AssignController = class AssignController {
    constructor(assignService) {
        this.assignService = assignService;
    }
    async assignPanelistToCandidate(candidateId, panelistName) {
        return this.assignService.assignPanelist(candidateId, panelistName);
    }
};
exports.AssignController = AssignController;
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)('candidateId')),
    __param(1, (0, common_1.Body)('panelistName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssignController.prototype, "assignPanelistToCandidate", null);
exports.AssignController = AssignController = __decorate([
    (0, common_1.Controller)('assign'),
    __metadata("design:paramtypes", [assign_service_1.AssignService])
], AssignController);
//# sourceMappingURL=assign.controller.js.map