import { Module } from '@nestjs/common';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';
import { PrismaModule, BrokerModule } from '@app/common';

@Module({
  imports: [BrokerModule, PrismaModule],
  controllers: [GradesController],
  providers: [GradesService],
})
export class GradesModule {}
