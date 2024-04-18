import { Controller, Inject } from '@nestjs/common';
import { BrokerService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateGradeDto, GradeDto } from './dto';
import { GradesService } from './grades.service';

@Controller()
export class GradesController {
  constructor(
    @Inject(BrokerService) private readonly brokerService: BrokerService,
    @Inject(GradesService) private readonly gradesService: GradesService,
  ) {}

  @MessagePattern({ cmd: 'get-grades' })
  async getGrades(
    @Ctx() context: RmqContext,
    @Payload() data: { studentId: number; subjectId: number },
  ): Promise<GradeDto[]> {
    this.brokerService.acknowledgeMessage(context);

    return this.gradesService.getGrades(data.studentId, data.subjectId);
  }

  @MessagePattern({ cmd: 'add-grade' })
  async addGrade(
    @Ctx() context: RmqContext,
    @Payload() data: CreateGradeDto,
  ): Promise<GradeDto> {
    this.brokerService.acknowledgeMessage(context);

    return this.gradesService.addGrade(data);
  }
}
