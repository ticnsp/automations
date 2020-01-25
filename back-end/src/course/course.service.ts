import { Inject, Injectable, Logger } from '@nestjs/common';

import { SemestersService } from '../semesters/semesters.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { CoordinatorsService } from 'src/coordinators/coordinators.service';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);
  private readonly allowedEntities = ['coordinator', 'student'];

  @Inject(SemestersService)
  private readonly semestersService: SemestersService;

  @Inject(CoordinatorsService)
  private readonly coordinatorsService: CoordinatorsService;

  @Inject(StudentsService)
  private readonly studentsService: StudentsService;

  @Inject(EnrollmentsService)
  private readonly enrollmentsService: EnrollmentsService;

  getHeathcheck(): string {
    return 'OK';
  }

  async getCourseSemester() {
    const allSemesters = await this.semestersService.getSemesters();
    const currentSemester = allSemesters.find(({ semesterCurrent }) => semesterCurrent);
    return currentSemester;
  }

  async getCourseCoordinators() {
    const coordinatorEnrollmentType = 'coordinator';
    const enrolledCoordinators = await this.getCourseEnrolledEntities(coordinatorEnrollmentType);
    return enrolledCoordinators;
  }

  async getCourseStudents() {
    const studentEnrollmentType = 'student';
    const enrolledStudents = await this.getCourseEnrolledEntities(studentEnrollmentType);
    return enrolledStudents;
  }

  private async getCourseEnrolledEntities(enrollmentType: string) {
    this.checkAllowedEntities(enrollmentType);
    const { semesterId: currentSemesterId } = await this.getCourseSemester();
    const enrollments = await this.enrollmentsService.getEnrollmentsForSemester(currentSemesterId, { enrollmentType });
    let enrolledEntities = [];
    if (enrollments.length > 0) {
      const enrolledIds = enrollments.map(({ enrolledId }) => enrolledId);
      const allEntities = await this.getAllEntities(enrollmentType);
      enrolledEntities = allEntities.filter((entity) => {
        const idKey = `${enrollmentType}Id`;
        const { [idKey]: entityId } = entity;
        return enrolledIds.includes(entityId);
      });
    }
    return enrolledEntities;
  }

  private async getAllEntities(entityType: string) {
    this.checkAllowedEntities(entityType);
    let allEntities = [];
    switch (entityType) {
      case 'coordinator':
        allEntities = await this.coordinatorsService.getCoordinators();
        break;
      case 'student':
        allEntities = await this.studentsService.getStudents();
        break;
    }
    return allEntities;
  }

  private async checkAllowedEntities(entityType) {
    if (!this.allowedEntities.includes(entityType)) {
      const errorMessage = `Invalid entity type ${entityType}`;
      throw new Error(errorMessage);
    }
  }
}