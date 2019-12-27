"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const students_controller_1 = require("./students.controller");
const students_service_1 = require("./students.service");
const student_model_1 = require("../models/student.model");
let StudentsModule = class StudentsModule {
};
StudentsModule = __decorate([
    common_1.Module({
        imports: [config_module_1.ConfigModule],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService, student_model_1.StudentModel],
    })
], StudentsModule);
exports.StudentsModule = StudentsModule;
//# sourceMappingURL=coordinators.module.js.map