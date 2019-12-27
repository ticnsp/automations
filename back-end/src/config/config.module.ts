import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

const configFileName = './.env.json';

@Module({
  providers: [{
    provide: ConfigService,
    useValue: new ConfigService(configFileName),
  }],
  exports: [ConfigService],
})
export class ConfigModule {}
