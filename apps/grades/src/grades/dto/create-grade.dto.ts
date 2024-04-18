import { IsInt, Max, Min } from 'class-validator';

export class CreateGradeDto {
  @IsInt()
  @Min(1, { message: 'Value must be at least 1' })
  @Max(12, { message: 'Value must be at most 12' })
  value: number;

  @IsInt()
  studentId: number;

  @IsInt()
  subjectId: number;
}
