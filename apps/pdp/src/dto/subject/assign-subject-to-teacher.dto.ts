import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignSubjectToTeacherDto {
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @IsInt()
  @IsNotEmpty()
  teacherId: number;
}
