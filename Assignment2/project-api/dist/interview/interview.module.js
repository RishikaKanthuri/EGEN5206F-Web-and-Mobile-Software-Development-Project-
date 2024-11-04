"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const interview_service_1 = require("./interview.service");
const interview_controller_1 = require("./interview.controller");
const interview_schema_1 = require("./interview.schema");
let InterviewsModule = class InterviewsModule {
};
exports.InterviewsModule = InterviewsModule;
exports.InterviewsModule = InterviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: interview_schema_1.Interview.name, schema: interview_schema_1.InterviewSchema }])],
        providers: [interview_service_1.InterviewsService],
        controllers: [interview_controller_1.InterviewsController],
        exports: [interview_service_1.InterviewsService],
    })
], InterviewsModule);
//# sourceMappingURL=interview.module.js.map