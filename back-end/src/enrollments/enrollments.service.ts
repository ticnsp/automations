import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnrollmentModel } from '../models/enrollment.model';
import { CreateEnrollmentDTO } from './createEnrollment.dto';

@Injectable()
export class EnrollmentsService {
  private readonly logger = new Logger(EnrollmentsService.name);
  @Inject(EnrollmentModel)
  private readonly enrollmentModel: EnrollmentModel;

  getHeathcheck(): string {
    return 'OK';
  }

  async getEnrollments(): Promise<any> {
    const enrollments = await this.enrollmentModel.list();
    return enrollments;
  }

  async createEnrollment(semesterId: string, enrollmentData: CreateEnrollmentDTO): Promise<any> {
    const newEnrollment = await this.enrollmentModel.create(semesterId, enrollmentData);
    return newEnrollment;
  }

  async getEnrollmentsForSemester(semesterId: string, otherParams?: any): Promise<any[]> {
    try {
      const semesterEnrollments = await this.enrollmentModel.query(semesterId, otherParams);
      return semesterEnrollments;
    } catch (error) {
      this.logger.error(`Couldn't fetch enrollments for semester ${semesterId}`);
      throw error;
    }
  }

  async updateEnrollment(semesterId: string, enrollmentId: string, enrollmentData: CreateEnrollmentDTO): Promise<any> {
    const updatedEnrollment = await this.enrollmentModel.update(semesterId, enrollmentId, enrollmentData);
    return updatedEnrollment;
  }

  async deleteEnrollment(semesterId: string, enrollmentId: string): Promise<string> {
    const deletedEnrollmentId = await this.enrollmentModel.delete(semesterId, enrollmentId);
    return deletedEnrollmentId;
  }
}
