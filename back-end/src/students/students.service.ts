import { Inject, Injectable, Logger } from '@nestjs/common';
import { StudentModel } from '../models/student.model';
import { CreateStudentDTO } from './createStudent.dto';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);
  @Inject(StudentModel)
  private readonly studentModel: StudentModel;

  getHeathcheck(): string {
    return 'OK';
  }

  async getStudents(): Promise<any> {
    const students = await this.studentModel.list();
    return students;
  }

  async getStudent(id): Promise<any> {
    const student = await this.studentModel.get(id);
    return student;
  }

  async createStudent(studentData: CreateStudentDTO): Promise<any> {
    const newStudent = await this.studentModel.create(studentData);
    return newStudent;
  }

  async updateStudent(id: string, studentData: CreateStudentDTO): Promise<any> {
    const updatedStudent = await this.studentModel.update(id, studentData);
    return updatedStudent;
  }

  async deleteStudent(id: string): Promise<string> {
    const deletedStudentId = await this.studentModel.delete(id);
    return deletedStudentId;
  }
}
