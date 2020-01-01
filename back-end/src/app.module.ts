import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { CoordinatorsModule } from './coordinators/coordinators.module';
import { StudentsModule } from './students/students.module';
import { SemestersModule } from './semesters/semesters.module';

@Module({
  imports: [
    ConfigModule,
    CoordinatorsModule,
    StudentsModule,
    SemestersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
