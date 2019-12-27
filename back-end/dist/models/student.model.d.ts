import { ConfigService } from '../config/config.service';
import { CreateStudentDTO } from '../students/createStudent.dto';
export declare class StudentModel {
    private readonly configService;
    private readonly logger;
    private tableName;
    constructor(configService: ConfigService);
    create(data: CreateStudentDTO): Promise<{
        studentId: any;
        studentNames: string;
        lastNames: string;
        birthdate: string;
        settings: any;
        notes: string;
        createdAt: string;
        updatedAt: any;
    }>;
    list(): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, data: CreateStudentDTO): Promise<any>;
    delete(id: string): Promise<string>;
}
