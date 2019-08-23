import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { enrollmentsTableName } = process.env;
  const params = {
    TableName: enrollmentsTableName,
    Key: {
      enrollmentId: event.pathParameters.id
    },
    UpdateExpression: "SET semesterId = :semesterId, studentId = :studentId, paidAt = :paidAt, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":semesterId": data.semesterId || null,
      ":studentId": data.studentId || null,
      ":paidAt": (data.paid ? Date.now() : null) || null,
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
