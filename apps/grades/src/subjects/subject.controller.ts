import { Controller, Inject } from '@nestjs/common';
import { BrokerService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  AssignSubjectToClassDto,
  AssignSubjectToTeacherDto,
  CreateSubjectDto,
  SubjectDto,
} from './dto';
import { SubjectService } from './subject.service';

@Controller()
export class SubjectController {
  constructor(
    @Inject(BrokerService) private readonly brokerService: BrokerService,
    @Inject(SubjectService) private readonly subjectService: SubjectService,
  ) {}

  @MessagePattern({ cmd: 'get-subjects' })
  async getSubjects(
    @Ctx() context: RmqContext,
    @Payload() data: { classId: number },
  ): Promise<SubjectDto[]> {
    this.brokerService.acknowledgeMessage(context);

    return this.subjectService.getSubjects(data.classId);
  }

  @MessagePattern({ cmd: 'add-subject' })
  async addSubject(
    @Ctx() context: RmqContext,
    @Payload() data: CreateSubjectDto,
  ): Promise<SubjectDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.subjectService.addSubject(data);
  }

  @MessagePattern({ cmd: 'assign-subject-to-class' })
  async assignSubjectToClass(
    @Ctx() context: RmqContext,
    @Payload() data: AssignSubjectToClassDto,
  ): Promise<SubjectDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.subjectService.assignSubjectToClass(data);
  }

  @MessagePattern({ cmd: 'assign-subject-to-teacher' })
  async assignSubjectToTeacher(
    @Ctx() context: RmqContext,
    @Payload() data: AssignSubjectToTeacherDto,
  ): Promise<SubjectDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.subjectService.assignSubjectToTeacher(data);
  }
}
