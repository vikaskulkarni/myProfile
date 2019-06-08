import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "profiles",
    Item: {
      profileId: uuid.v1(),
      name: data.name,
      header: data.header,
      summary: data.summary,
      objective: data.objective,
      qualification: data.qualification,
      experience: data.experience,
      proficiency: data.proficiency,
      achievements: data.achievements,
      projectHighlights: data.projectHighlights,
      listingOrder: data.listingOrder,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
