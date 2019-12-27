import { CreateCoordinatorDTO } from './createStudent.dto';
export declare class CoordinatorsService {
    private readonly logger;
    private readonly coordinatorModel;
    getHeathcheck(): string;
    getCoordinators(): Promise<any>;
    getCoordinator(id: any): Promise<any>;
    createCoordinator(coordinatorData: CreateCoordinatorDTO): Promise<any>;
    updateCoordinator(id: string, coordinatorData: CreateCoordinatorDTO): Promise<any>;
    deleteCoordinator(id: string): Promise<string>;
}
