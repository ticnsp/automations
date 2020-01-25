import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentModel } from '../models/enrollment.model';

@Module({
  imports: [ConfigModule],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentModel],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
