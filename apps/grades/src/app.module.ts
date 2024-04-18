import { Module } from '@nestjs/common';
import { SubjectModule } from './subjects/subject.module';
import { GradesModule } from './grades/grades.module';

@Module({
  imports: [SubjectModule, GradesModule],
})
export class AppModule {}
