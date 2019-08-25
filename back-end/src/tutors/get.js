import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure, unauthorized } from "../libs/response-lib";

export async function main(event, context) {
  const { cognitoIdentityId } = event.requestContext.identity;
  if (!cognitoIdentityId) {
    return unauthorized({ status: false });
  }
  const { tutorsTableName } = process.env;
  const params = {
    TableName: tutorsTableName,
    Key: {
      tutorId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
