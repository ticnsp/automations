import { CreateStudentDTO } from './createStudent.dto';
export declare class StudentsController {
    private readonly studentsService;
    getHealthcheck(): any;
    createStudent(body: CreateStudentDTO): Promise<any>;
    getStudents(): Promise<any>;
    getStudent(id: string): Promise<any>;
    updateStudent(id: string, body: CreateStudentDTO): Promise<any>;
    deleteStudent(id: string): Promise<any>;
}
