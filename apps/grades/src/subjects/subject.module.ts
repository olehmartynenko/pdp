import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { PrismaModule, RedisCacheModule, BrokerModule } from '@app/common';

@Module({
  imports: [BrokerModule, PrismaModule, RedisCacheModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
