import { CreateCoordinatorDTO } from './createCoordinator.dto';
export declare class CoordinatorsController {
    private readonly coordinatorsService;
    getHealthcheck(): string;
    createCoordinator(body: CreateCoordinatorDTO): Promise<any>;
    getCoordinators(): Promise<any>;
    getCoordinator(id: string): Promise<any>;
    updateCoordinator(id: string, body: CreateCoordinatorDTO): Promise<any>;
    deleteCoordinator(id: string): Promise<string>;
}
