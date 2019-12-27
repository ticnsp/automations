import { CreateStudentDTO } from './createStudent.dto';
export declare class StudentsService {
    private readonly logger;
    private readonly studentModel;
    getHeathcheck(): string;
    getStudents(): Promise<any>;
    getStudent(id: any): Promise<any>;
    createStudent(studentData: CreateStudentDTO): Promise<any>;
    updateStudent(id: string, studentData: CreateStudentDTO): Promise<any>;
    deleteStudent(id: string): Promise<string>;
}
