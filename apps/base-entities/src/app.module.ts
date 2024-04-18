import { Module } from '@nestjs/common';
import { StudentModule } from './students/student.module';
import { ClassModule } from './classes/class.module';
import { TeacherModule } from './teachers/teacher.module';

@Module({
  imports: [StudentModule, ClassModule, TeacherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
