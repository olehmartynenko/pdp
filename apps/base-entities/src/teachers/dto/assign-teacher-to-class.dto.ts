import { IsInt, IsNotEmpty } from 'class-validator';

export class AssignTeacherToClassDto {
  @IsInt()
  @IsNotEmpty()
  teacherId: number;

  @IsInt()
  @IsNotEmpty()
  classId: number;
}
