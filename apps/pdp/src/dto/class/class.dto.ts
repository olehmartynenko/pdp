import { IsInt } from 'class-validator';
import { CreateClassDto } from './create-class.dto';

export class ClassDto extends CreateClassDto {
  @IsInt()
  id: number;
}
