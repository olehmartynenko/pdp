import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  fullName: string;

  @IsInt()
  @IsOptional()
  classId: number;
}
