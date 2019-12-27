import {
  Inject,
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CoordinatorsService } from './coordinators.service';
import { CreateCoordinatorDTO } from './createCoordinator.dto';

@Controller('coordinators')
export class CoordinatorsController {

  @Inject(CoordinatorsService)
  private readonly coordinatorsService: CoordinatorsService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.coordinatorsService.getHeathcheck();
  }

  @Post()
  async createCoordinator(@Body() body: CreateCoordinatorDTO) {
    return await this.coordinatorsService.createCoordinator(body);
  }

  @Get()
  async getCoordinators() {
    return await this.coordinatorsService.getCoordinators();
  }

  @Get(':id')
  async getCoordinator(@Param('id') id: string) {
    return await this.coordinatorsService.getCoordinator(id);
  }

  @Put(':id')
  async updateCoordinator(@Param('id') id: string, @Body() body: CreateCoordinatorDTO) {
    return await this.coordinatorsService.updateCoordinator(id, body);
  }

  @Delete(':id')
  async deleteCoordinator(@Param('id') id: string) {
    return await this.coordinatorsService.deleteCoordinator(id);
  }
}
