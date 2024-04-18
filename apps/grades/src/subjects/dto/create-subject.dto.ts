import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be at most 50 characters long' })
  name: string;

  @IsInt()
  @Min(1, { message: 'Value must be at least 1' })
  @IsOptional()
  classId: number;

  @IsInt()
  @Min(1, { message: 'Value must be at least 1' })
  @IsOptional()
  teacherId: number;
}
