import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure, unauthorized } from "../libs/response-lib";

export async function main(event, context) {
  const { cognitoIdentityId } = event.requestContext.identity;
  if (!cognitoIdentityId) {
    return unauthorized({ status: false });
  }
  const data = JSON.parse(event.body);
  const { studentsTableName } = process.env;
  const params = {
    TableName: studentsTableName,
    Item: {
      studentId: uuid.v1(),
      studentNames: data.studentNames,
      lastNames: data.lastNames,
      birthdate: data.birthdate,
      tutors: data.tutors,
      emergencyContact: data.emergencyContact,
      notes: data.notes,
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
