import {
  Controller,
  Inject,
  Get,
  Post,
  Param,
} from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {

  @Inject(CourseService)
  private readonly courseService: CourseService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.courseService.getHeathcheck();
  }

  @Get('semester')
  async getCourseSemester() {
    return await this.courseService.getCourseSemester();
  }

  @Get('coordinators')
  async getCourseCoordinators() {
    return await this.courseService.getCourseCoordinators();
  }

  @Post('enroll/coordinator/:coordinatorId')
  async enrollCoordinator(@Param('coordinatorId') coordinatorId: string) {
    return 'OK';
  }

  @Get('students')
  async getCourseStudents() {
    return await this.courseService.getCourseStudents();
  }
}