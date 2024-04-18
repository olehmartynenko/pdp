import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AssignSubjectToClassDto,
  AssignSubjectToTeacherDto,
  CreateSubjectDto,
} from '../dto/subject';

@Controller()
export class SubjectController {
  constructor(
    @Inject('GRADES_SERVICE')
    private readonly gradesService: ClientProxy,
  ) {}

  @Get('/subjects/:classId')
  async getSubjects(@Param('classId') classId: number) {
    return this.gradesService.send(
      {
        cmd: 'get-subjects',
      },
      { classId },
    );
  }

  @Post('/subject')
  async addSubject(@Body() body: CreateSubjectDto) {
    return this.gradesService.send(
      {
        cmd: 'add-subject',
      },
      body,
    );
  }

  @Post('/class/assign-subject')
  async assignSubjectToClass(@Body() body: AssignSubjectToClassDto) {
    return this.gradesService.send(
      {
        cmd: 'assign-subject-to-class',
      },
      body,
    );
  }

  @Post('/teacher/assign-subject')
  async assignSubjectToTeacher(@Body() body: AssignSubjectToTeacherDto) {
    return this.gradesService.send(
      {
        cmd: 'assign-subject-to-teacher',
      },
      body,
    );
  }
}
