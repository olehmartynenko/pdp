import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AssignTeacherToClassDto, CreateTeacherDto } from '../dto/teacher';

@Controller()
export class TeacherController {
  constructor(
    @Inject('BASE_ENTITIES_SERVICE')
    private readonly baseEntitiesService: ClientProxy,
  ) {}

  @Get('/teachers')
  async getTeachers() {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-teachers',
      },
      {},
    );
  }

  @Get('/teacher/:id')
  async getTeacher(id: number) {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-teacher',
      },
      { id },
    );
  }

  @Post('/teacher')
  async addTeacher(@Body() body: CreateTeacherDto) {
    return this.baseEntitiesService.send(
      {
        cmd: 'add-teacher',
      },
      body,
    );
  }

  @Post('/class/assign-teacher')
  async assignClass(@Body() body: AssignTeacherToClassDto) {
    return this.baseEntitiesService.send(
      {
        cmd: 'assign-teacher',
      },
      body,
    );
  }
}
