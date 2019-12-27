import { Inject, Injectable, Logger } from '@nestjs/common';
import { CoordinatorModel } from '../models/coordinator.model';
import { CreateCoordinatorDTO } from './createCoordinator.dto';

@Injectable()
export class CoordinatorsService {
  private readonly logger = new Logger(CoordinatorsService.name);
  @Inject(CoordinatorModel)
  private readonly coordinatorModel: CoordinatorModel;

  getHeathcheck(): string {
    return 'OK';
  }

  async getCoordinators(): Promise<any> {
    const coordinators = await this.coordinatorModel.list();
    return coordinators;
  }

  async getCoordinator(id): Promise<any> {
    const coordinator = await this.coordinatorModel.get(id);
    return coordinator;
  }

  async createCoordinator(coordinatorData: CreateCoordinatorDTO): Promise<any> {
    const newCoordinator = await this.coordinatorModel.create(coordinatorData);
    return newCoordinator;
  }

  async updateCoordinator(id: string, coordinatorData: CreateCoordinatorDTO): Promise<any> {
    const updatedCoordinator = await this.coordinatorModel.update(id, coordinatorData);
    return updatedCoordinator;
  }

  async deleteCoordinator(id: string): Promise<string> {
    const deletedCoordinatorId = await this.coordinatorModel.delete(id);
    return deletedCoordinatorId;
  }
}
