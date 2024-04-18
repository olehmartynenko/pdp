import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { PrismaModule, RedisCacheModule, BrokerModule } from '@app/common';

@Module({
  imports: [BrokerModule, PrismaModule, RedisCacheModule],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
