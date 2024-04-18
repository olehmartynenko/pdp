import { PrismaService, RedisCacheService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateSubjectDto, SubjectDto } from './dto';

@Injectable()
export class SubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}

  getSubjects(classId: number): Promise<SubjectDto[]> {
    const cachedSubjects = this.cacheService.get<SubjectDto[]>('subjects');

    if (cachedSubjects) {
      return cachedSubjects;
    }

    const subjects = this.prisma.subject.findMany({ where: { classId } });

    this.cacheService.set('subjects', subjects, 60 * 60 * 24 * 90);

    return subjects;
  }

  getSubject(id: number): Promise<SubjectDto> {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  async addSubject(data: CreateSubjectDto): Promise<SubjectDto | Error> {
    const existingSubject = await this.prisma.subject.findFirst({
      where: {
        name: data.name,
        classId: data.classId,
        teacherId: data.teacherId,
      },
    });

    if (existingSubject) {
      return {
        message: 'Subject already exists',
        name: 'SubjectAlreadyExistsError',
      };
    }

    return this.prisma.subject.create({ data });
  }

  async assignSubjectToClass(data: {
    subjectId: number;
    classId: number;
  }): Promise<SubjectDto | Error> {
    const subject = await this.prisma.subject.findUnique({
      where: { id: data.subjectId },
    });

    if (!subject) {
      return {
        message: 'Subject does not exist',
        name: 'SubjectNotFoundError',
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

    const existingSubject = await this.prisma.subject.findFirst({
      where: {
        name: subject.name,
        classId: data.classId,
      },
    });

    if (existingSubject) {
      return {
        message: 'Subject already assigned to this class',
        name: 'AlreadyAssignedError',
      };
    }

    return this.prisma.subject.update({
      where: { id: data.subjectId },
      data: { classId: data.classId },
    });
  }

  async assignSubjectToTeacher(data: {
    subjectId: number;
    teacherId: number;
  }): Promise<SubjectDto | Error> {
    const subject = await this.prisma.subject.findUnique({
      where: { id: data.subjectId },
    });

    if (!subject) {
      return {
        message: 'Subject does not exist',
        name: 'SubjectNotFoundError',
      };
    }

    const teacherExists = await this.prisma.teacher.findUnique({
      where: { id: data.teacherId },
    });

    if (!teacherExists) {
      return {
        message: 'Teacher does not exist',
        name: 'TeacherNotFoundError',
      };
    }

    const existingSubject = await this.prisma.subject.findFirst({
      where: {
        name: subject.name,
        teacherId: data.teacherId,
      },
    });

    if (existingSubject) {
      return {
        name: 'AlreadyAssignedError',
        message: 'Subject already assigned to this teacher',
      };
    }

    return this.prisma.subject.update({
      where: { id: data.subjectId },
      data: { teacherId: data.teacherId },
    });
  }
}
