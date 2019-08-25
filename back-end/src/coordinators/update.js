import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { coordinatorsTableName } = process.env;
  const params = {
    TableName: coordinatorsTableName,
    Key: {
      coordinatorId: event.pathParameters.id
    },
    UpdateExpression: "SET names = :names, lastNames = :lastNames, contacts = :contacts, settings = :settings, notes = :notes, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":names": data.names || null,
      ":lastNames": data.lastNames || null,
      ":contacts": data.contacts || null,
      ":settings": data.settings || null,
      ":notes": data.notes || null,
      ":updatedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
