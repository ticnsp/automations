import { Inject, Injectable, Logger } from '@nestjs/common';
import { SemesterModel } from '../models/semester.model';
import { CreateSemesterDTO } from './createSemester.dto';

@Injectable()
export class SemestersService {
  private readonly logger = new Logger(SemestersService.name);
  @Inject(SemesterModel)
  private readonly semesterModel: SemesterModel;

  getHeathcheck(): string {
    return 'OK';
  }

  async getSemesters(): Promise<any> {
    const semesters = await this.semesterModel.list();
    return semesters;
  }

  async getSemester(id): Promise<any> {
    const semester = await this.semesterModel.get(id);
    return semester;
  }

  async createSemester(semesterData: CreateSemesterDTO): Promise<any> {
    const newSemester = await this.semesterModel.create(semesterData);
    return newSemester;
  }

  async updateSemester(id: string, semesterData: CreateSemesterDTO): Promise<any> {
    const updatedSemester = await this.semesterModel.update(id, semesterData);
    return updatedSemester;
  }

  async deleteSemester(id: string): Promise<string> {
    const deletedSemesterId = await this.semesterModel.delete(id);
    return deletedSemesterId;
  }
}
