import serverless = require('serverless-http');
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Express } from 'express';
import { EnrollmentsModule } from './enrollments.module';

const app: Express = express();

async function bootstrap() {
  const nestApp = await NestFactory.create<NestExpressApplication>(EnrollmentsModule, new ExpressAdapter(app));
  nestApp.enableCors();
  await nestApp.init();
}

const isAppInitialized = (expressInstance) => {
  return !!(expressInstance._router && expressInstance._router.stack);
};

async function handler(req, res) {
  if (!isAppInitialized(app)) {
    await bootstrap();
  }
  app(req, res);
}

exports.main = serverless(handler);
