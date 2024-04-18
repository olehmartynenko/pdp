import { Controller, Inject } from '@nestjs/common';
import { BrokerService } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AssignStudentToClassDto, CreateStudentDto, StudentDto } from './dto';
import { StudentService } from './student.service';

@Controller()
export class StudentController {
  constructor(
    @Inject(BrokerService) private readonly brokerService: BrokerService,
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @MessagePattern({ cmd: 'get-student' })
  async getStudent(
    @Ctx() context: RmqContext,
    @Payload() data: { id: number },
  ): Promise<StudentDto> {
    this.brokerService.acknowledgeMessage(context);

    return this.studentService.getStudent(data.id);
  }

  @MessagePattern({ cmd: 'add-student' })
  async addStudent(
    @Ctx() context: RmqContext,
    @Payload() data: CreateStudentDto,
  ): Promise<StudentDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.studentService.addStudent(data);
  }

  @MessagePattern({ cmd: 'get-students' })
  async getStudents(
    @Ctx() context: RmqContext,
    @Payload() data: any,
  ): Promise<StudentDto[]> {
    this.brokerService.acknowledgeMessage(context);

    return this.studentService.getStudents(data.classId);
  }

  @MessagePattern({ cmd: 'assign-student' })
  async assignStudent(
    @Ctx() context: RmqContext,
    @Payload() data: AssignStudentToClassDto,
  ): Promise<StudentDto | Error> {
    this.brokerService.acknowledgeMessage(context);

    return this.studentService.assignStudent(data);
  }
}
