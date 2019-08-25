import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure, unauthorized } from "../libs/response-lib";

export async function main(event, context) {
  const { cognitoIdentityId } = event.requestContext.identity;
  if (!cognitoIdentityId) {
    return unauthorized({ status: false });
  }
  const data = JSON.parse(event.body);
  const { coordinatorsTableName } = process.env;
  const params = {
    TableName: coordinatorsTableName,
    Item: {
      coordinator: uuid.v1(),
      names: data.names,
      lastNames: data.lastNames,
      contacts: data.contacts,
      settings: data.settings,
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
