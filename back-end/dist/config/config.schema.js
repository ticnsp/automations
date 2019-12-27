"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("@hapi/joi");
const schema = {
    ENVIRONMENT: Joi.string()
        .valid('development', 'staging', 'testing', 'production')
        .default('development'),
    AWS_REGION: Joi.string()
        .valid('us-east-1')
        .default('us-east-1'),
};
exports.configurationSchema = Joi.object(schema);
//# sourceMappingURL=config.schema.js.map