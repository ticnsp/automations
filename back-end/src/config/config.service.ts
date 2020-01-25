import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';

import { configurationSchema } from './config.schema';
import { AWSError } from 'aws-sdk';

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly envConfig: EnvConfig;

  static service: ConfigService;

  constructor(filePath?: string) {
    let config = {};
    if (filePath && filePath.length) {
      try {
        config = JSON.parse(fs.readFileSync(filePath).toString());
      } catch (error) {
        this.logger.warn(`Couldn't load config file, using defaults: ${error}`);
      }
      this.envConfig = this.validateInput(config);
      ConfigService.service = this;
    }
  }

  static getInstance() {
    if (!this.service) {
      const configService = new ConfigService();
      this.service = configService;
    }
    return this.service;
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const { error, value: validatedEnvConfig } = configurationSchema.validate(envConfig);
    if (error) {
      throw new Error(`Configuration validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get environment(): string {
    const { ENVIRONMENT } = this.envConfig;
    return ENVIRONMENT;
  }

  get awsRegion(): string {
    const { AWS_REGION } = this.envConfig;
    return AWS_REGION;
  }
}
