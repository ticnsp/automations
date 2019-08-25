import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const { studentsTableName } = process.env;
  const params = {
    TableName: studentsTableName,
    Key: {
      studentId: event.pathParameters.id
    },
    UpdateExpression: "SET studentNames = :studentNames, lastNames = :lastNames, birthdate = :birthdate, tutors = :tutors, emergencyContact = :emergencyContact, notes = :notes, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":studentNames": data.studentNames || null,
      ":lastNames": data.lastNames || null,
      ":birthdate": data.birthdate || null,
      ":tutors": data.tutors || null,
      ":emergencyContact": data.emergencyContact || null,
      ":notes": data.notes || null,
      ":updatedAt": Date.now(),
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
