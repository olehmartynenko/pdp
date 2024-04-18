import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignSubjectToClassDto {
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @IsInt()
  @IsNotEmpty()
  classId: number;
}
