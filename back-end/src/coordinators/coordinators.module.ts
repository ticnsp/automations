import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CoordinatorsController } from './coordinators.controller';
import { CoordinatorsService } from './coordinators.service';
import { CoordinatorModel } from '../models/coordinator.model';

@Module({
  imports: [ConfigModule],
  controllers: [CoordinatorsController],
  providers: [CoordinatorsService, CoordinatorModel],
})
export class CoordinatorsModule {}
