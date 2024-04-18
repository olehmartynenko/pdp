import { Module } from '@nestjs/common';

import { BrokerModule } from '@app/common';
import {
  TeacherController,
  ClassController,
  StudentController,
  GradeController,
  SubjectController,
} from './controllers';

@Module({
  imports: [
    BrokerModule.registerRmq('BASE_ENTITIES_SERVICE', 'base_entities_queue'),
    BrokerModule.registerRmq('GRADES_SERVICE', 'grades_queue'),
  ],
  controllers: [
    TeacherController,
    ClassController,
    StudentController,
    GradeController,
    SubjectController,
  ],
})
export class AppModule {}
