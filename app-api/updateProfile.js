import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "profiles",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'profileId': path parameter
    Key: {
      profileId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      "SET name = :name, header = :header, objective = :objective, \
    qualification = :qualification, experience = :experience, proficiency = :proficiency, \
    achievements = :achievements, projectHighlights = :projectHighlights, projectDetails = :projectDetails",
    ExpressionAttributeValues: {
      ":name": data.name || null,
      ":header": data.header || null,
      ":objective": data.objective || null,
      ":qualification": data.qualification || null,
      ":experience": data.experience || null,
      ":proficiency": data.proficiency || null,
      ":achievements": data.achievements || null,
      ":projectHighlights": data.projectHighlights || null,
      ":projectDetails": data.projectDetails || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
