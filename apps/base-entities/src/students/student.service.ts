import { Injectable } from '@nestjs/common';
import { CreateStudentDto, StudentDto } from './dto';
import { PrismaService, RedisCacheService } from '@app/common';

@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}
  async getStudent(id: number): Promise<StudentDto> {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async addStudent(data: CreateStudentDto): Promise<StudentDto | Error> {
    const existingStudent = await this.prisma.student.findFirst({
      where: {
        fullName: data.fullName,
        classId: data.classId,
      },
    });

    if (existingStudent) {
      return {
        message: 'Student already exists',
        name: 'StudentAlreadyExistsError',
      };
    }

    return this.prisma.student.create({ data });
  }

  async getStudents(classId: number): Promise<StudentDto[]> {
    const cachedStudents = await this.cacheService.get<StudentDto[]>(
      `students-${classId}`,
    );

    if (cachedStudents) {
      return cachedStudents;
    }

    const students = await this.prisma.student.findMany({ where: { classId } });

    this.cacheService.set(`students-${classId}`, students, 60 * 60 * 24 * 90);

    return students;
  }

  async assignStudent(data: {
    studentId: number;
    classId: number;
  }): Promise<StudentDto | Error> {
    const student = await this.prisma.student.findUnique({
      where: { id: data.studentId },
    });

    if (!student) {
      return {
        message: 'Student does not exist',
        name: 'StudentNotFoundError',
      };
    }

    const classExists = await this.prisma.class.findUnique({
      where: { id: data.classId },
    });

    if (!classExists) {
      return {
        message: 'Class does not exist',
        name: 'ClassNotFoundError',
      };
    }

    const existingStudent = await this.prisma.student.findFirst({
      where: {
        fullName: student.fullName,
        classId: data.classId,
      },
    });

    if (existingStudent) {
      return {
        message: 'Student already exists in this class',
        name: 'StudentAlreadyExistsError',
      };
    }

    return this.prisma.student.update({
      where: { id: data.studentId },
      data: { classId: data.classId },
    });
  }
}
