import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SemestersController } from './semesters.controller';
import { SemestersService } from './semesters.service';
import { SemesterModel } from '../models/semester.model';

@Module({
  imports: [ConfigModule],
  controllers: [SemestersController],
  providers: [SemestersService, SemesterModel],
  exports: [SemestersService],
})
export class SemestersModule {}
