import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateGradeDto, GradeDto } from './dto';

@Injectable()
export class GradesService {
  constructor(private readonly prisma: PrismaService) {}

  getGrades(studentId: number, subjectId: number): Promise<GradeDto[]> {
    return this.prisma.grade.findMany({
      where: { studentId, subjectId },
    });
  }

  addGrade(data: CreateGradeDto): Promise<GradeDto> {
    return this.prisma.grade.create({ data });
  }
}
