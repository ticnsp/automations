import * as AWS from 'aws-sdk';
import { ConfigService } from '../config/config.service';

const configService = ConfigService.getInstance();

export function call(action, params) {
  const { awsRegion } = configService;
  const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: awsRegion });
  return dynamoDb[action](params).promise();
}
