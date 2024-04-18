import { Controller, Inject } from '@nestjs/common';
import { BrokerService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ClassDto, CreateClassDto } from './dto';
import { ClassService } from './class.service';

@Controller()
export class ClassController {
  constructor(
    @Inject(BrokerService) private readonly brokerService: BrokerService,
    @Inject(ClassService) private readonly classService: ClassService,
  ) {}

  @MessagePattern({ cmd: 'get-classes' })
  async getClasses(@Ctx() context: RmqContext): Promise<ClassDto[]> {
    this.brokerService.acknowledgeMessage(context);

    return this.classService.getClasses();
  }

  @MessagePattern({ cmd: 'add-class' })
  async addClass(
    @Ctx() context: RmqContext,
    @Payload() data: CreateClassDto,
  ): Promise<ClassDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.classService.addClass(data);
  }

  @MessagePattern({ cmd: 'get-class' })
  async getClass(
    @Ctx() context: RmqContext,
    @Payload() data: { id: number },
  ): Promise<ClassDto> {
    this.brokerService.acknowledgeMessage(context);

    return this.classService.getClass(data.id);
  }
}
