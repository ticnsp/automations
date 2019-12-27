"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const config_service_1 = require("../config/config.service");
const configService = config_service_1.ConfigService.getInstance();
function call(action, params) {
    const { awsRegion } = configService;
    const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: awsRegion });
    return dynamoDb[action](params).promise();
}
exports.call = call;
//# sourceMappingURL=dynamodb-lib.js.map