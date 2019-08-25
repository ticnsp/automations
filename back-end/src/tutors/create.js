import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure, unauthorized } from "../libs/response-lib";

export async function main(event, context) {
  const { cognitoIdentityId } = event.requestContext.identity;
  if (!cognitoIdentityId) {
    return unauthorized({ status: false });
  }
  const data = JSON.parse(event.body);
  const { tutorsTableName } = process.env;
  const params = {
    TableName: tutorsTableName,
    Item: {
      tutorId: uuid.v1(),
      names: data.names,
      lastNames: data.lastNames,
      contacts: data.contacts,
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
