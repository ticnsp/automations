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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const students_service_1 = require("./students.service");
const createStudent_dto_1 = require("./createStudent.dto");
let StudentsController = class StudentsController {
    getHealthcheck() {
        return this.studentsService.getHeathcheck();
    }
    async createStudent(body) {
        return await this.studentsService.createStudent(body);
    }
    async getStudents() {
        return await this.studentsService.getStudents();
    }
    async getStudent(id) {
        return await this.studentsService.getStudent(id);
    }
    async updateStudent(id, body) {
        return await this.studentsService.updateStudent(id, body);
    }
    async deleteStudent(id) {
        return await this.studentsService.deleteStudent(id);
    }
};
__decorate([
    common_1.Inject(students_service_1.StudentsService),
    __metadata("design:type", typeof (_a = typeof students_service_1.StudentsService !== "undefined" && students_service_1.StudentsService) === "function" ? _a : Object)
], StudentsController.prototype, "studentsService", void 0);
__decorate([
    common_1.Get('healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getHealthcheck", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createStudent_dto_1.CreateStudentDTO]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createStudent", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudents", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getStudent", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createStudent_dto_1.CreateStudentDTO]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "updateStudent", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "deleteStudent", null);
StudentsController = __decorate([
    common_1.Controller('students')
], StudentsController);
exports.StudentsController = StudentsController;
//# sourceMappingURL=coordinators.controller.js.map