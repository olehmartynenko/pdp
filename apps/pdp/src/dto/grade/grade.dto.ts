import { IsDate, IsInt } from 'class-validator';
import { CreateGradeDto } from './create-grade.dto';

export class GradeDto extends CreateGradeDto {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;
}
