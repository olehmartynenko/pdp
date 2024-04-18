import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AssignStudentToClassDto, CreateStudentDto } from '../dto/student';

@Controller()
export class StudentController {
  constructor(
    @Inject('BASE_ENTITIES_SERVICE')
    private readonly baseEntitiesService: ClientProxy,
  ) {}
  @Get('/class/:id/students')
  async getStudents(id: number) {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-students',
      },
      { classId: id },
    );
  }

  @Get('/student/:id')
  async getStudent(@Param('id') id: number) {
    return this.baseEntitiesService.send(
      {
        cmd: 'get-student',
      },
      { id },
    );
  }

  @Post('/student')
  async addStudent(@Body() body: CreateStudentDto) {
    return this.baseEntitiesService.send(
      {
        cmd: 'add-student',
      },
      body,
    );
  }

  @Post('/class/assign-student')
  async assignStudent(@Body() data: AssignStudentToClassDto) {
    return this.baseEntitiesService.send(
      {
        cmd: 'assign-student',
      },
      data,
    );
  }
}
