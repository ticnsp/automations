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
import { SemestersService } from './semesters.service';
import { CreateSemesterDTO } from './createSemester.dto';

@Controller('semesters')
export class SemestersController {

  @Inject(SemestersService)
  private readonly semestersService: SemestersService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.semestersService.getHeathcheck();
  }

  @Post()
  async createSemester(@Body() body: CreateSemesterDTO) {
    return await this.semestersService.createSemester(body);
  }

  @Get()
  async getSemesters() {
    return await this.semestersService.getSemesters();
  }

  @Get(':id')
  async getSemester(@Param('id') id: string) {
    return await this.semestersService.getSemester(id);
  }

  @Put(':id')
  async updateSemester(@Param('id') id: string, @Body() body: CreateSemesterDTO) {
    return await this.semestersService.updateSemester(id, body);
  }

  @Delete(':id')
  async deleteSemester(@Param('id') id: string) {
    return await this.semestersService.deleteSemester(id);
  }
}
