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
exports.PanelistController = void 0;
const common_1 = require("@nestjs/common");
const panelist_service_1 = require("./panelist.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_enum_1 = require("../auth/roles.enum");
let PanelistController = class PanelistController {
    constructor(panelistService) {
        this.panelistService = panelistService;
    }
    getPanelistInterviews() {
        return 'Protected panelist interviews';
    }
    async findAll() {
        return this.panelistService.findAll();
    }
    getInterviews(panelistName) {
        return this.panelistService.getPanelistInterviews(panelistName);
    }
};
exports.PanelistController = PanelistController;
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Panelist),
    (0, common_1.Get)('interviews'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PanelistController.prototype, "getPanelistInterviews", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PanelistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('interviews'),
    __param(0, (0, common_1.Body)('panelistName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PanelistController.prototype, "getInterviews", null);
exports.PanelistController = PanelistController = __decorate([
    (0, common_1.Controller)('panelists'),
    __metadata("design:paramtypes", [panelist_service_1.PanelistService])
], PanelistController);
//# sourceMappingURL=panelist.controller.js.map