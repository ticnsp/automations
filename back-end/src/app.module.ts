import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from './config/config.module';
import { CoordinatorsModule } from './coordinators/coordinators.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    ConfigModule,
    CoordinatorsModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
