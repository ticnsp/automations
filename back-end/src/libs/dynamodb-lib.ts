import * as AWS from 'aws-sdk';
import { ConfigService } from '../config/config.service';
import { convertStringToBool } from './bool-lib';

const configService = ConfigService.getInstance();

export function call(action, params) {
  const { awsRegion } = configService;
  const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: awsRegion });
  return dynamoDb[action](params).promise();
}

export function processOtherParamsForQueries(startingExpressionAttributeValues, otherParams) {
  let ExpressionAttributeValues = startingExpressionAttributeValues;
  let FilterExpression = null;
  const hasOtherParams = Object.keys(otherParams).length > 0;
  if (hasOtherParams) {
    FilterExpression = Object.entries(otherParams).reduce((acc, entry) => {
      const [key, value] = entry;
      if (value !== undefined) {
        const newKey = `${key} = :${key}`;
        return [...acc, newKey];
      }
      return acc;
    }, []).join(' and ');
    ExpressionAttributeValues = Object.entries(otherParams).reduce((allKeys, entry) => {
      const [key, value] = entry;
      if (value !== undefined) {
        const keyWithColon = `:${key}`;
        const processedValue = convertStringToBool(value);
        return {
          ...allKeys,
          [keyWithColon]: processedValue,
        }
      }
      return allKeys
    }, ExpressionAttributeValues);
  }
  return { FilterExpression, ExpressionAttributeValues };
}