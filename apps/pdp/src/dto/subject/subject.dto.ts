import { IsInt } from 'class-validator';
import { CreateSubjectDto } from './create-subject.dto';

export class SubjectDto extends CreateSubjectDto {
  @IsInt()
  id: number;
}
