import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaModule, RedisCacheModule, BrokerModule } from '@app/common';

@Module({
  imports: [BrokerModule, PrismaModule, RedisCacheModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
