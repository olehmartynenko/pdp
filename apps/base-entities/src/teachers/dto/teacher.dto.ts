import { IsInt } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

export class TeacherDto extends CreateTeacherDto {
  @IsInt()
  id: number;
}
