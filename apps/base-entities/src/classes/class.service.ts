import { Injectable } from '@nestjs/common';
import { ClassDto, CreateClassDto } from './dto';
import { PrismaService, RedisCacheService } from '@app/common';

@Injectable()
export class ClassService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
  ) {}
  async getClasses(): Promise<ClassDto[]> {
    const cachedClasses = await this.cacheService.get<ClassDto[]>('classes');

    if (cachedClasses) {
      return cachedClasses;
    }

    const classes = await this.prisma.class.findMany();

    this.cacheService.set('classes', classes, 60 * 60 * 24 * 90);

    return classes;
  }

  async addClass(data: CreateClassDto): Promise<ClassDto | Error> {
    const existingClass = await this.prisma.class.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingClass) {
      return {
        message: 'Class already exists',
        name: 'ClassAlreadyExistsError',
      };
    }

    return this.prisma.class.create({ data });
  }

  async getClass(id: number): Promise<ClassDto> {
    return this.prisma.class.findUnique({ where: { id } });
  }
}
