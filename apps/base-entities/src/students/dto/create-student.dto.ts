import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  fullName: string;

  @IsInt()
  @IsOptional()
  classId: number;
}
