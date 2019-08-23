import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure, unauthorized } from "../libs/response-lib";

export async function main(event, context) {
  const { cognitoIdentityId } = event.requestContext.identity;
  if (!cognitoIdentityId) {
    return unauthorized({ status: false });
  }

  const data = JSON.parse(event.body);
  const { enrollmentsTableName } = process.env;
  const params = {
    TableName: enrollmentsTableName,
    Item: {
      enrollmentId: uuid.v1(),
      semesterId: data.semesterId,
      studentId: data.studentId,
      paidAt: (data.paid ? Date.now() : null),
      createdAt: Date.now(),
      updatedAt: null,
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
