import * as Joi from '@hapi/joi';

const schema = {
  ENVIRONMENT: Joi.string()
    .valid('development', 'staging', 'testing', 'production')
    .default('development'),
  AWS_REGION: Joi.string()
    .valid('us-east-1')
    .default('us-east-1'),
};

export const configurationSchema: Joi.ObjectSchema = Joi.object(schema);
