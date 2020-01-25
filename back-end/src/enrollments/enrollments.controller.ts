import {
  Inject,
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDTO } from './createEnrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {

  @Inject(EnrollmentsService)
  private readonly enrollmentsService: EnrollmentsService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.enrollmentsService.getHeathcheck();
  }

  @Post(':semesterId')
  async createEnrollment(@Param('semesterId') semesterId: string, @Body() body: CreateEnrollmentDTO) {
    return await this.enrollmentsService.createEnrollment(semesterId, body);
  }

  @Get()
  async getEnrollments() {
    return await this.enrollmentsService.getEnrollments();
  }

  @Get(':semesterId')
  async getEnrollmentsForSemester(@Param('semesterId') semesterId: string, @Query() query: any) {
    const { enrollmentType, paid } = query;
    return await this.enrollmentsService.getEnrollmentsForSemester(semesterId, { enrollmentType, paid });
  }

  @Put(':semesterId/:enrollmentId')
  async updateEnrollment(@Param('semesterId') semesterId: string, @Param('enrollmentId') enrollmentId: string, @Body() body: CreateEnrollmentDTO) {
    return await this.enrollmentsService.updateEnrollment(semesterId, enrollmentId, body);
  }

  @Delete(':semesterId/:enrollmentId')
  async deleteEnrollment(@Param('semesterId') semesterId: string, @Param('enrollmentId') enrollmentId: string) {
    return await this.enrollmentsService.deleteEnrollment(semesterId, enrollmentId);
  }
}
