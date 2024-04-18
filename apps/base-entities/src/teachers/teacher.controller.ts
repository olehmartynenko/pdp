import { Controller, Inject } from '@nestjs/common';
import { BrokerService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AssignTeacherToClassDto, CreateTeacherDto, TeacherDto } from './dto';
import { TeacherService } from './teacher.service';

@Controller()
export class TeacherController {
  constructor(
    @Inject(BrokerService) private readonly brokerService: BrokerService,
    @Inject(TeacherService) private readonly teacherService: TeacherService,
  ) {}

  @MessagePattern({ cmd: 'get-teachers' })
  async getTeachers(@Ctx() context: RmqContext): Promise<TeacherDto[]> {
    this.brokerService.acknowledgeMessage(context);

    return this.teacherService.getTeachers();
  }

  @MessagePattern({ cmd: 'get-teacher' })
  async getTeacher(
    @Ctx() context: RmqContext,
    @Payload() data: { id: number },
  ): Promise<TeacherDto> {
    this.brokerService.acknowledgeMessage(context);

    return this.teacherService.getTeacher(data.id);
  }

  @MessagePattern({ cmd: 'add-teacher' })
  async addTeacher(
    @Ctx() context: RmqContext,
    @Payload() data: CreateTeacherDto,
  ): Promise<TeacherDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.teacherService.addTeacher(data);
  }

  @MessagePattern({ cmd: 'assign-teacher' })
  async assignTeacher(
    @Ctx() context: RmqContext,
    @Payload() data: AssignTeacherToClassDto,
  ): Promise<TeacherDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.teacherService.assignTeacher(data);
  }
}
