import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignStudentToClassDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  classId: number;
}
