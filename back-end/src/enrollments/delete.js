import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const { enrollmentsTableName } = process.env;
  const params = {
    TableName: enrollmentsTableName,
    Key: {
      enrollmentId: event.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
