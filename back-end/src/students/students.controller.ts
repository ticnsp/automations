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
import { StudentsService } from './students.service';
import { CreateStudentDTO } from './createStudent.dto';

@Controller('students')
export class StudentsController {

  @Inject(StudentsService)
  private readonly studentsService: StudentsService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.studentsService.getHeathcheck();
  }

  @Post()
  async createStudent(@Body() body: CreateStudentDTO) {
    return await this.studentsService.createStudent(body);
  }

  @Get()
  async getStudents() {
    return await this.studentsService.getStudents();
  }

  @Get(':id')
  async getStudent(@Param('id') id: string) {
    return await this.studentsService.getStudent(id);
  }

  @Put(':id')
  async updateStudent(@Param('id') id: string, @Body() body: CreateStudentDTO) {
    return await this.studentsService.updateStudent(id, body);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return await this.studentsService.deleteStudent(id);
  }
}
