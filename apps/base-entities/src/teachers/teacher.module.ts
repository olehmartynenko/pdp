import { Module } from '@nestjs/common';

import { PrismaModule, RedisCacheModule, BrokerModule } from '@app/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [BrokerModule, PrismaModule, RedisCacheModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
