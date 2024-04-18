import { IsInt } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class StudentDto extends CreateStudentDto {
  @IsInt()
  id: number;
}
