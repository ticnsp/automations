import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { SemestersModule } from 'src/semesters/semesters.module';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { CoordinatorsModule } from 'src/coordinators/coordinators.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    ConfigModule,
    SemestersModule,
    EnrollmentsModule,
    CoordinatorsModule,
    StudentsModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
