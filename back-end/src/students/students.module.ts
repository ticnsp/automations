import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentModel } from '../models/student.model';

@Module({
  imports: [ConfigModule],
  controllers: [StudentsController],
  providers: [StudentsService, StudentModel],
})
export class StudentsModule {}
