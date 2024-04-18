import { PrismaService, RedisCacheService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto, TeacherDto } from './dto';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}

  async getTeachers(): Promise<TeacherDto[]> {
    const cachedTeachers = await this.cacheService.get<TeacherDto[]>(
      'teachers',
    );

    if (cachedTeachers) {
      return cachedTeachers;
    }

    const teachers = await this.prisma.teacher.findMany();

    this.cacheService.set('teachers', teachers, 60 * 60 * 24 * 90);

    return teachers;
  }

  async getTeacher(id: number): Promise<TeacherDto> {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  async addTeacher(data: CreateTeacherDto): Promise<TeacherDto | Error> {
    const existingTeacher = await this.prisma.teacher.findFirst({
      where: {
        fullName: data.fullName,
        classId: data.classId,
      },
    });

    if (existingTeacher) {
      return {
        message: 'Teacher already exists',
        name: 'TeacherAlreadyExistsError',
      };
    }

    return this.prisma.teacher.create({ data });
  }

  async assignTeacher(data: {
    teacherId: number;
    classId: number;
  }): Promise<TeacherDto | Error> {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: data.teacherId },
    });

    if (!teacher) {
      return {
        message: 'Teacher does not exist',
        name: 'TeacherNotFoundError',
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

    const existingTeacher = await this.prisma.teacher.findFirst({
      where: {
        fullName: teacher.fullName,
        classId: data.classId,
      },
    });

    if (existingTeacher) {
      return {
        message: 'Teacher already assigned to this class',
        name: 'AlreadyAssignedError',
      };
    }

    return this.prisma.teacher.update({
      where: { id: data.teacherId },
      data: { classId: data.classId },
    });
  }
}
