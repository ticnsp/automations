import { ConfigService } from '../config/config.service';
import { CreateCoordinatorDTO } from '../coordinators/createCoordinator.dto';
export declare class CoordinatorModel {
    private readonly configService;
    private readonly logger;
    private tableName;
    constructor(configService: ConfigService);
    create(data: CreateCoordinatorDTO): Promise<{
        coordinatorId: any;
        coordinatorNames: string;
        lastNames: string;
        birthdate: string;
        settings: any;
        notes: string;
        createdAt: string;
        updatedAt: any;
    }>;
    list(): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, data: CreateCoordinatorDTO): Promise<any>;
    delete(id: string): Promise<string>;
}
