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
var StudentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const student_model_1 = require("../models/student.model");
let StudentsService = StudentsService_1 = class StudentsService {
    constructor() {
        this.logger = new common_1.Logger(StudentsService_1.name);
    }
    getHeathcheck() {
        return 'OK';
    }
    async getStudents() {
        const students = await this.studentModel.list();
        return students;
    }
    async getStudent(id) {
        const student = await this.studentModel.get(id);
        return student;
    }
    async createStudent(studentData) {
        const newStudent = await this.studentModel.create(studentData);
        return newStudent;
    }
    async updateStudent(id, studentData) {
        const updatedStudent = await this.studentModel.update(id, studentData);
        return updatedStudent;
    }
    async deleteStudent(id) {
        const deletedStudentId = await this.studentModel.delete(id);
        return deletedStudentId;
    }
};
__decorate([
    common_1.Inject(student_model_1.StudentModel),
    __metadata("design:type", student_model_1.StudentModel)
], StudentsService.prototype, "studentModel", void 0);
StudentsService = StudentsService_1 = __decorate([
    common_1.Injectable()
], StudentsService);
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map