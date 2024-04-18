import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateGradeDto } from '../dto/grade';

@Controller()
export class GradeController {
  constructor(
    @Inject('GRADES_SERVICE')
    private readonly gradesService: ClientProxy,
  ) {}

  @Get('/student/:studentId/grades/:subjectId')
  async getGrades(
    @Param('studentId') studentId: number,
    @Param('subjectId') subjectId: number,
  ) {
    return this.gradesService.send(
      {
        cmd: 'get-grades',
      },
      { studentId, subjectId },
    );
  }

  @Post('/grade')
  async addGrade(@Body() body: CreateGradeDto) {
    return this.gradesService.send(
      {
        cmd: 'add-grade',
      },
      body,
    );
  }
}
