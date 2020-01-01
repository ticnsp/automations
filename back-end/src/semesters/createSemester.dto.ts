export class CreateSemesterDTO {
  readonly semesterName: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly semesterCurrent: boolean;
  readonly notes: string;
}
